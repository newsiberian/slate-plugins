import React from 'react';

const root = {
  position: 'absolute',
  // required to correct positioning
  top: 0,
  left: 0,
} as React.CSSProperties;

const span = {
  opacity: 0.9,
  color: 'grey',
  fontSize: '10vw',
  textShadow: '1px 1px 2px black, 0 0 1em white',
} as React.CSSProperties;

interface LeftProps {
  left: number;
  leftClassName?: string;
}

interface SpanProps {
  className?: string;
  style?: object;
}

export default React.memo(function Left({ left, leftClassName }: LeftProps) {
  const overlayEl = React.useRef(null);

  const updatePosition = () => {
    const overlay = overlayEl.current;
    const parent = overlay.parentElement as HTMLElement;

    const parentRect = parent.getBoundingClientRect();
    const overlayRect = overlay.getBoundingClientRect();

    overlay.style.top = `${parentRect.height / 2 - overlayRect.height / 2}px`;
    overlay.style.left = `${parentRect.width / 2 - overlayRect.width / 2}px`;
  };

  React.useEffect(
    (): void => {
      // center position on first load
      updatePosition();
    },
  );

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
