import { Element, Editor, Range } from 'slate';

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

export const withLinkify = (
  editor: Editor,
  options = {} as LinkifyOptions,
): Editor => {
  const typedEditor = editor as LinkifyEditor;
  const { target = '_blank', rel = 'noreferrer noopener' } = options;
  const { insertData, insertBreak, insertText, isInline } = typedEditor;

  typedEditor.isInline = (element) =>
    Element.isElementType(element, LINK) || isInline(element);

  typedEditor.insertBreak = () => {
    if (Range.isCollapsed(typedEditor.selection)) {
      tryWrapLink(typedEditor);
    }

    insertBreak();
  };

  typedEditor.insertText = (text) => {
    if (
      [' ', ',', '.'].includes(text) &&
      Range.isCollapsed(typedEditor.selection)
    ) {
      tryWrapLink(typedEditor);
    } else if (isLink(text)) {
      wrapLink(typedEditor, text);
    }

    insertText(text);
  };

  typedEditor.insertData = (data) => {
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
  typedEditor.linkElementType = ({
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

  return typedEditor;
};
