import type { ReactElement } from 'react';
import {
  BaseEditor,
  Editor as SlateEditor,
  Element,
  Range,
  Text,
  Transforms,
} from 'slate';
import type { ReactEditor, RenderElementProps } from 'slate-react';
import LinkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = LinkifyIt();
linkify.tlds(tlds);

export const LINK = <const>'link';

export type LinkifyEditor<Editor extends BaseEditor & ReactEditor> = Editor & {
  linkElementType: ({
    attributes,
    children,
    element,
  }: Omit<RenderElementProps, 'element'> & {
    element: LinkifyElement;
  }) => ReactElement;
};

export type LinkifyElement = {
  type: typeof LINK;
  url: string;
  children: Text[];
};

const isLinkifyElement = (element: any): element is LinkifyElement =>
  Element.isElementType(element, LINK);

/**
 * If text contains something similar to link `true` will be returned
 */
export const isLink = (text: string): boolean => linkify.test(text);

export const isLinkActive = <Editor extends BaseEditor & ReactEditor>(
  editor: Editor,
) => {
  const [link] = SlateEditor.nodes(editor, {
    match: isLinkifyElement,
  });
  return !!link;
};

export const getLinkUrl = <Editor extends BaseEditor & ReactEditor>(
  editor: Editor,
) => {
  const [match] = SlateEditor.nodes(editor, {
    match: isLinkifyElement,
  });

  const [node] = match;

  return isLinkifyElement(node) ? node.url : undefined;
};

/**
 * We additionally want to return isEdit flag to upper function
 */
const isEditLink = <Editor extends BaseEditor & ReactEditor>(
  editor: Editor,
): boolean => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
    return true;
  }
  return false;
};

/**
 * Remove `link` inline from the current caret position
 */
export const unwrapLink = <Editor extends BaseEditor & ReactEditor>(
  editor: Editor,
): void => {
  const [link] = SlateEditor.nodes(editor, {
    match: isLinkifyElement,
  });
  // we need to select all link text for case when selection is collapsed. In
  // that case we re-create new link for the same text
  Transforms.select(editor, link[1]);
  Transforms.unwrapNodes(editor, {
    match: isLinkifyElement,
  });
};

/**
 * Wrap underlying text into `link` inline
 */
export const wrapLink = <Editor extends BaseEditor & ReactEditor>(
  editor: Editor,
  text: string,
): void => {
  const isEdit = isEditLink(editor);
  const isExpanded = Range.isExpanded(editor.selection);

  const link = {
    type: LINK,
    url: text,
    children: isExpanded || isEdit ? [] : [{ text }],
  };

  // if this is a link editing, we shouldn't rename it even if it is not selected
  if (isExpanded || isEdit) {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
    Transforms.move(editor, { distance: 1, unit: 'offset' });
  } else {
    Transforms.insertNodes(editor, link);
  }
};

export const insertLink = <Editor extends BaseEditor & ReactEditor>(
  editor: Editor,
  url: string,
): void => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

/**
 * We are trying to detect links while user typing
 */
export const tryWrapLink = <Editor extends BaseEditor & ReactEditor>(
  editor: Editor,
): void => {
  const { selection } = editor;
  const [start] = Range.edges(selection);
  const [word, wordAnchorOffset] = getWordUnderCaret(
    SlateEditor.string(editor, start.path),
    selection,
  );

  // too short word. Probably not the link
  if (word.length < 3) {
    return;
  }

  const links = linkify.match(word);

  if (!links) {
    return;
  }

  // first link will be enough
  const [link] = links;

  if (!link) {
    return;
  }

  Transforms.select(editor, {
    anchor: {
      path: start.path,
      offset: wordAnchorOffset + link.index,
    },
    focus: {
      path: start.path,
      offset: wordAnchorOffset + link.lastIndex,
    },
  });
  wrapLink(editor, link.url);
};

/**
 * In this function we try to detect link-like text peaces and convert them to
 * links. We assume that this pasted text is a plain text and because of that
 * we can transform it to slate-compatible fragment before inserting
 */
export const insertPastedLinks = (data: DataTransfer, insertData): void => {
  const text = data.getData('text/plain');
  const links = linkify.match(text);

  if (!links) {
    insertData(data);
    return;
  }

  let prevLineStart = 0;
  const pasteLength = text.length;

  const children = [];

  links.forEach((link) => {
    const prevText = text.slice(prevLineStart, link.index);
    if (prevText.length) {
      children.push(toTextFragment(prevText));
    }
    children.push(toLinkFragment(link));
    prevLineStart = link.lastIndex;
  });

  const nextText = text.slice(prevLineStart, pasteLength);
  if (nextText.length) {
    children.push(toTextFragment(nextText));
  }

  if (!children.length) {
    insertData(data);
    return;
  }

  // generate new DataTransfer instance w/ slate-compatible fragment
  const dataTrans = new DataTransfer();
  const fragment = JSON.stringify([{ children }]);
  const encoded = window.btoa(encodeURIComponent(fragment));
  dataTrans.setData('application/x-slate-fragment', encoded);
  dataTrans.setData('text/plain', text);

  insertData(dataTrans);
};

const toTextFragment = (text) => ({
  text,
});

const toLinkFragment = (link) => ({
  type: LINK,
  url: link.url,
  children: [{ text: link.text }],
});

/**
 * Find the underlying word under selection
 */
const getWordUnderCaret = (
  text: string,
  selection: Range,
): [string, number] => {
  const start = Range.isForward(selection) ? selection.anchor : selection.focus;
  const wordBeginningOffset = traverseBehind(start.offset, text);
  return [text.slice(wordBeginningOffset, start.offset), wordBeginningOffset];
};

/**
 * Find the word beginning
 * @param {number} index - current search position
 * @param {string} text
 * @return {number} word beginning position
 */
const traverseBehind = (index: number, text: string): number => {
  if (index > 0 && !isWhitespace(text[index - 1])) {
    return traverseBehind(index - 1, text);
  }
  return index;
};

/**
 * Whitespace checker
 */
const isWhitespace = (value: string): boolean => {
  return /[ \f\n\r\t\v\u00A0\u2028\u2029]/.test(value);
};
