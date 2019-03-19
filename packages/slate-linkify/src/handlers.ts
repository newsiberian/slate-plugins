import linkifyIt from 'linkify-it';
import slate from 'slate';
import tlds from 'tlds';

const linkify = linkifyIt();
linkify.tlds(tlds);

export const handleKeyDown = (
  event: KeyboardEvent,
  editor: slate.Editor,
  next,
  options,
) => {
  // It will be better if we will try to detect links only after "word" will be
  // finished. We will check links possibilities at current word near the caret
  if (event.key !== 'Enter' && event.key !== ' ') {
    return next();
  }

  const { value } = editor;
  const { anchorText, selection } = value;

  if (!anchorText) {
    return next();
  }

  const [word, wordAnchorOffset] = getWordUnderCaret(
    anchorText.text,
    selection,
  );
  const links = linkify.match(word);

  if (!links) {
    return next();
  }

  links.forEach(link => {
    editor
      .moveAnchorTo(wordAnchorOffset + link.index)
      .moveFocusTo(wordAnchorOffset + link.lastIndex);
    editor.command(options.wrapCommand, link.url).moveToEnd();
  });
};

export const handlePaste = (command, editor: slate.Editor, next, options) => {
  const { type, args } = command;

  if (type === 'insertFragment') {
    const links = linkify.match(args[0].text);

    if (!links) {
      return next();
    }

    let prevLineStart = 0;
    const { value } = editor;
    const { selection } = value;
    const pasteLength = args[0].text.length;
    const offset = selection.isForward
      ? selection.anchor.offset
      : selection.focus.offset;

    next();

    links.forEach(link => {
      const shift = prevLineStart > 0 ? -prevLineStart : offset;
      editor
        .moveAnchorTo(link.index + shift)
        .moveFocusTo(link.lastIndex + shift);
      editor.command(options.wrapCommand, link.url).moveToEnd();
      prevLineStart = link.lastIndex;
    });
    editor.moveTo(pasteLength - prevLineStart);
  } else {
    return next();
  }
};

/**
 * Find the underlying word under selection
 * @param {string} text
 * @param {Selection} selection
 */
const getWordUnderCaret = (
  text: string,
  selection: slate.Selection,
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
