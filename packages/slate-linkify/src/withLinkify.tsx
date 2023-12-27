import type { HTMLAttributeAnchorTarget, ReactElement } from 'react';
import { BaseEditor, Element, Range } from 'slate';
import type { RenderElementProps, ReactEditor } from 'slate-react';

import {
  insertPastedLinks,
  isLink,
  LINK,
  wrapLink,
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

export const withLinkify = <Editor extends BaseEditor & ReactEditor>(
  editor: Editor,
  options = {} as LinkifyOptions,
) => {
  const { target = '_blank', rel = 'noreferrer noopener' } = options;
  const {
    isInline: isInlineOrigin,
    insertBreak: insertBreakOrigin,
    insertText: insertTextOrigin,
    insertData: insertDataOrigin,
  } = editor;
  const isInline: typeof editor.isInline = (element) =>
    Element.isElementType(element, LINK) || isInlineOrigin(element);

  const insertBreak: typeof editor.insertBreak = () => {
    if (Range.isCollapsed(editor.selection)) {
      tryWrapLink(editor);
    }

    insertBreakOrigin();
  };

  const insertText: typeof editor.insertText = (text, options) => {
    if ([' ', ',', '.'].includes(text) && Range.isCollapsed(editor.selection)) {
      tryWrapLink(editor);
    } else if (isLink(text)) {
      wrapLink(editor, text);
    }

    insertTextOrigin(text, options);
  };

  const insertData: typeof editor.insertData = (data) => {
    const text = data.getData('text/plain');

    // this is for pasting links, but we ignore it if snippet contains html.
    // that's the work for the other plugin that must deserialize `html` by other
    // way and both plugins must work in conjunction to cover all pasting cases
    if (!data.types.includes('text/html') && text && isLink(text)) {
      insertPastedLinks(data, insertDataOrigin);
    } else {
      insertDataOrigin(data);
    }
  };

  /**
   * This function must be provided to `renderElement` prop
   */
  const linkElementType = ({
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

  return Object.assign(editor, {
    isInline,
    insertBreak,
    insertText,
    insertData,
    linkElementType,
  });
};
