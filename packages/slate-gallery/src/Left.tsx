import * as React from 'react';

const root = {
  position: 'absolute',
  // required to correct positioning
  top: 0,
  left: 0,
} as React.CSSProperties;

const span = {
  opacity: 0.6,
  color: 'grey',
  fontSize: '8rem',
  textShadow: '1px 1px 2px black, 0 0 1em white',
} as React.CSSProperties;

interface Props {
  left: number;
}

export default React.memo(function Left({ left }: Props) {
  const overlayEl = React.useRef(null);

  const updatePosition = () => {
    const overlay = overlayEl.current;
    const parent = overlay.parentElement as HTMLElement;

    const parentRect = parent.getBoundingClientRect();
    const overlayRect = overlay.getBoundingClientRect();

    overlay.style.top = `${parentRect.height / 2 - overlayRect.height / 2}px`;
    overlay.style.left = `${parentRect.width / 2 - overlayRect.width / 2}px`;
  };

  React.useEffect((): void => {
    // center position on first load
    updatePosition();
  });

  return (
    <div style={root} ref={overlayEl}>
      <span style={span}>
        {'+'}
        {left}
      </span>
    </div>
  );
});
