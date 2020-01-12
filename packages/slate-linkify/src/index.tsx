import React from 'react';
import { Editor } from 'slate';

import {
  insertLink,
  insertPastedLinks,
  isLink,
  isLinkActive,
  LINK,
  onKeyDown,
  wrapLink,
} from './utils';

export interface RenderComponentArgs {
  href: string;
  /**
   * must be passed to component as prop. This goes from slate internals
   */
  'data-key': string;
  className?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;
}

export interface LinkifyOptions {
  /**
   * A render function that can render a custom anchor component
   * @param {RenderComponentArgs} args
   * @return {React.ReactElement}
   */
  renderComponent?: (args: RenderComponentArgs) => React.ReactElement;
  /**
   * Anchor custom class name
   * @type {string}
   */
  className?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;
}

const withLinkify = (editor: Editor, options = {} as LinkifyOptions) => {
  const { target = '_blank', rel = 'noreferrer noopener' } = options;
  const { insertData, insertText, isInline } = editor;

  editor.isInline = element => {
    return element.type === LINK ? true : isInline(element);
  };

  editor.insertText = text => {
    if (text && isLink(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');

    // this is for pasting links, but we ignore it if snippet contains html.
    // that's the work for the other plugin that must deserialize `html` by other
    // way and both plugins must work in conjunction to cover all pasting cases
    if (!data.types.includes('text/html') && text && isLink(text)) {
      insertPastedLinks(data, insertData);
    } else {
      insertData(data);
    }
  };

  /**
   * This function must be provided to  `renderElement` prop
   * @param attributes
   * @param children
   * @param element
   */
  editor.linkElementType = ({ attributes, children, element }) => {
    const className = options.className ? { className: options.className } : {};
    const anchorProps = {
      ...attributes,
      ...className,
      target,
      rel,
      href: element.url,
    };

    return typeof options.renderComponent === 'function' ? (
      options.renderComponent({ ...anchorProps, children })
    ) : (
      <a {...anchorProps}>{children}</a>
    );
  };

  return editor;
};

export { insertLink, isLinkActive, onKeyDown, withLinkify };
