import LinkifyIt from 'linkify-it';
import { Editor, Range, Transforms } from 'slate';
import tlds from 'tlds';

const linkify = LinkifyIt();
linkify.tlds(tlds);

export const LINK = 'link';

/**
 * If text contains something similar to link `true` will be returned
 * @param {string} text
 */
export const isLink = (text: string): boolean => linkify.test(text);

export const isLinkActive = (editor: Editor): boolean => {
  const [link] = Editor.nodes(editor, { match: n => n.type === LINK });
  return !!link;
};

/**
 * We additionally want to return isEdit flag to upper function
 * @param {Editor} editor
 */
const isEditLink = (editor: Editor): boolean => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
    return true;
  }
  return false;
};

/**
 * Remove `link` inline from the current caret position
 * @param {Editor} editor
 */
const unwrapLink = (editor: Editor): void => {
  const [link] = Editor.nodes(editor, { match: n => n.type === LINK });
  // we need to select all link text for case when selection is collapsed. In
  // that case we re-create new link for the same text
  Transforms.select(editor, link[1]);
  Transforms.unwrapNodes(editor, { match: n => n.type === LINK });
};

/**
 * Wrap underlying text into `link` inline
 * @param {Editor} editor
 * @param {string} url - href
 */
export const wrapLink = (editor: Editor, url: string): void => {
  const isEdit = isEditLink(editor);

  const { selection } = editor;
  const isExpanded = selection && Range.isExpanded(selection);
  const link = {
    type: LINK,
    url,
    children: isExpanded || isEdit ? [] : [{ text: url }],
  };

  // if this is a link editing, we shouldn't rename it even if it is not selected
  if (isExpanded || isEdit) {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  } else {
    Transforms.insertNodes(editor, link);
  }
};

export const insertLink = (editor: Editor, url: string): void => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

/**
 * We are trying to detect links while user typing
 * @param {KeyboardEvent} event
 * @param {Editor} editor
 */
export const onKeyDown = (event: KeyboardEvent, editor: Editor): void => {
  // It will be better if we will try to detect links only after "word" will be
  // finished. We will check links possibilities at current word near the caret
  if (event.key !== 'Enter' && event.key !== ' ' && event.key !== ',') {
    return;
  }

  const { selection } = editor;
  if (selection && Range.isCollapsed(selection)) {
    const [start] = Range.edges(selection);
    const [word, wordAnchorOffset] = getWordUnderCaret(
      Editor.string(editor, start.path),
      selection,
    );
    const links = linkify.match(word);

    if (!links) {
      return;
    }

    links.forEach(link => {
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
    });
  }
};

/**
 * In this function we try to detect link-like text peaces and convert them to
 * links. We assume that this pasted text is a plain text and because of that
 * we can transform it to slate-compatible fragment before inserting
 * @param {DataTransfer} data
 * @param {function} insertData
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

  links.forEach(link => {
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

const toTextFragment = text => ({
  text,
});

const toLinkFragment = link => ({
  type: LINK,
  url: link.url,
  children: [{ text: link.text }],
});

/**
 * Find the underlying word under selection
 * @param {string} text
 * @param {Range} selection
 */
const getWordUnderCaret = (
  text: string,
  selection: Range,
): [string, number] => {
  const start = selection.isForward ? selection.anchor : selection.focus;
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
 * @param {string} value
 * @return {boolean}
 */
const isWhitespace = (value: string): boolean => {
  return /[ \f\n\r\t\v\u00A0\u2028\u2029]/.test(value);
};
