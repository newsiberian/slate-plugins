import { Element, BaseText, BaseElement, Range } from 'slate';

import type { RenderElementProps } from 'slate-react';
import type { HTMLAttributeAnchorTarget, ReactElement } from 'react';

import {
  insertPastedLinks,
  isLink,
  LINK,
  wrapLink,
  LinkifyEditor,
  LinkifyElement,
  tryWrapLink,
} from './utils';

export type RenderComponentProps = RenderElementProps['attributes'] & {
  href: string;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  children: ReactElement | ReactElement[];
};

export type LinkifyOptions = {
  /**
   * A render function that can render a custom anchor component
   */
  renderComponent?: (args: RenderComponentProps) => ReactElement;
  /**
   * Anchor custom class name
   */
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: LinkifyEditor;
    Element: LinkifyElement | BaseElement;
    Text: LinkifyElement | BaseText;
  }
}

export const withLinkify = (
  editor: LinkifyEditor,
  options = {} as LinkifyOptions,
) => {
  const { target = '_blank', rel = 'noreferrer noopener' } = options;
  const { insertData, insertBreak, insertText, isInline } = editor;

  editor.isInline = (element) =>
    Element.isElementType(element, LINK) || isInline(element);

  editor.insertBreak = () => {
    if (Range.isCollapsed(editor.selection)) {
      tryWrapLink(editor);
    }

    insertBreak();
  };

  editor.insertText = (text) => {
    if ([' ', ',', '.'].includes(text) && Range.isCollapsed(editor.selection)) {
      tryWrapLink(editor);
    } else if (isLink(text)) {
      wrapLink(editor, text);
    }

    insertText(text);
  };

  editor.insertData = (data) => {
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
   * This function must be provided to `renderElement` prop
   */
  editor.linkElementType = ({
    attributes,
    children,
    element,
  }: Omit<RenderElementProps, 'element'> & { element: LinkifyElement }) => {
    const anchorProps = {
      ...attributes,
      className: options.className,
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
