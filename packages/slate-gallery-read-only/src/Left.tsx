import { memo, useEffect, useRef } from 'react';

import type { CSSProperties } from 'react';

const root: CSSProperties = {
  position: 'absolute',
  // required to correct positioning
  top: 0,
  left: 0,
};

const span: CSSProperties = {
  opacity: 0.9,
  color: 'grey',
  fontSize: '10vw',
  textShadow: '1px 1px 2px black, 0 0 1em white',
};

type LeftProps = {
  left: number;
  leftClassName?: string;
};

type SpanProps = {
  className?: string;
  style?: CSSProperties;
};

export const LeftCount = memo(function LeftCount({
  left,
  leftClassName,
}: LeftProps) {
  const overlayEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // center position on first load
    const overlay = overlayEl.current;
    const parent = overlay.parentElement as HTMLElement;

    const parentRect = parent.getBoundingClientRect();
    const overlayRect = overlay.getBoundingClientRect();

    overlay.style.top = `${parentRect.height / 2 - overlayRect.height / 2}px`;
    overlay.style.left = `${parentRect.width / 2 - overlayRect.width / 2}px`;
  }, []);

  const spanProps = {} as SpanProps;

  if (leftClassName) {
    spanProps.className = leftClassName;
  } else {
    spanProps.style = span;
  }

  return (
    <div style={root} ref={overlayEl}>
      <span {...spanProps}>
        {'+'}
        {left}
      </span>
    </div>
  );
});
