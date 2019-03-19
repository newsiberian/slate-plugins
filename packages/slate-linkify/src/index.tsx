import React from 'react';
import slate from 'slate';

import { handleKeyDown, handlePaste } from './handlers';

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
  isActiveQuery?: string;
  wrapCommand?: string;
  unwrapCommand?: string;
  /**
   * A render function that can render a custom anchor component
   * @param {RenderComponentArgs} args
   * @return {React.ReactElement}
   */
  renderComponent?: (args: RenderComponentArgs) => React.ReactElement;
  /**
   * Anchor custom class name
   */
  className?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;
}

const linkifyPlugin = (options = {} as LinkifyOptions) => {
  const {
    // isActiveQuery = 'isLinkActive',
    wrapCommand = 'wrapLink',
    // unwrapCommand = 'unwrapLink',
    target = '_blank',
    rel = 'noreferrer noopener',
  } = options;

  return {
    onKeyDown(event: KeyboardEvent, editor: slate.Editor, next) {
      return handleKeyDown(event, editor, next, { wrapCommand });
    },

    onCommand(command, editor: slate.Editor, next) {
      return handlePaste(command, editor, next, { wrapCommand });
    },

    commands: {
      /**
       * Wrap underlying text into `link` inline block
       * @param {Editor} editor
       * @param {string} url - href
       */
      wrapLink(editor: slate.Editor, url: string) {
        editor.wrapInline({ data: { url }, type: 'link' });
      },
      /**
       * Remove `link` inline block from current caret position
       * @param {Editor} editor
       */
      unwrapLink(editor: slate.Editor) {
        editor.unwrapInline('link');
      },
    },

    queries: {
      isLinkActive(editor, value) {
        const { inlines } = value;
        return inlines.some(i => i.type === 'link');
      },
    },

    renderNode(props, editor, next) {
      const { node, attributes, children } = props;
      switch (props.node.type) {
        case 'link': {
          const className = options.className
            ? { className: options.className }
            : {};
          const anchorProps = {
            ...attributes,
            ...className,
            target,
            rel,
            href: node.data.get('url'),
          };
          return typeof options.renderComponent === 'function' ? (
            options.renderComponent({ ...anchorProps, children })
          ) : (
            <a {...anchorProps}>{children}</a>
          );
        }
        default:
          return next();
      }
    },
  };
};

export { linkifyPlugin };
