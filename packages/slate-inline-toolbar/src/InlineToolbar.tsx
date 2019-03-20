// import * as React from 'react';
// import { useEffect, useRef, useState } from 'react';
//
// import { Record } from 'immutable';
//
// const ivoryDarken = '#fafafa';
// const ivoryDarkest = '#d0d0d0';
//
// const toolbarBeforeAfterRules = {
//   top: '100%',
//   left: '50%',
//   content: "''",
//   border: 'solid transparent',
//   height: 0,
//   width: 0,
//   position: 'absolute',
//   pointerEvents: 'none',
// };
//
// const useStyles = makeStyles({
//   root: {
//     display: 'flex',
//     marginLeft: 5,
//     marginRight: 5,
//     transform: multiple(translateX('-50%'), scaleX(0)),
//     transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
//     position: 'absolute',
//     border: `1px solid ${ivoryDarkest}`,
//     borderRadius: 4,
//     backgroundColor: ivoryDarken,
//     boxShadow: `0px 1px 3px 0px ${ivoryDarkest}`,
//     zIndex: 2,
//     boxSizing: 'border-box',
//
//     '&:after': {
//       ...toolbarBeforeAfterRules,
//       borderColor: 'rgba(255, 255, 255, 0)',
//       borderTopColor: ivoryDarken,
//       borderWidth: 4,
//       marginLeft: -4,
//     },
//     '&:before': {
//       ...toolbarBeforeAfterRules,
//       borderColor: 'rgba(221, 221, 221, 0)',
//       borderTopColor: ivoryDarkest,
//       borderWidth: 6,
//       marginLeft: -6,
//     },
//   },
//   buttonGroup: {
//     display: 'inline-block',
//   },
//   buttonGroupSelected: {
//     boxShadow: 'none',
//   },
// });
//
// const getMargin = (element, side = 'left') => {
//   const elementStyles = window.getComputedStyle
//     ? getComputedStyle(element, null)
//     : element.currentStyle;
//   return parseInt(
//     elementStyles[`margin${`${side.charAt(0).toUpperCase()}${side.slice(1)}`}`],
//     10,
//   );
// };
//
// export default function InlineToolbar({ children, editor, editorRef }) {
//   const classes = useStyles();
//   const [show, setShow] = useState(false);
//   const [width, setWidth] = useState(null);
//   const [pointerCSS, setPointerCSS] = useState(null);
//   const toolbarEl = useRef(null);
//   const { value } = editor;
//
//   /**
//    * calculate toolbar pointer (css arrow) position
//    * @param alignment
//    * @param selectionRect
//    * @param fromBeginningToMiddle
//    * @returns {string|number}
//    */
//   const calculatePointerPosition = (
//     alignment,
//     selectionRect,
//     fromBeginningToMiddle,
//     parentEnd,
//   ) => {
//     if (typeof alignment === 'string') {
//       if (alignment === 'left') {
//         // I don't know why we need to remove 1 px, but we should
//         setPointerCSS(`{ left: ${fromBeginningToMiddle - 1}px; }`);
//       } else {
//         setPointerCSS(
//           `{ left: ${toolbarEl.current.offsetWidth -
//             (parentEnd -
//               selectionRect.right +
//               1 +
//               selectionRect.width / 2)}px; }`,
//         );
//       }
//     } else {
//       setPointerCSS(null);
//     }
//   };
//
//   const updateToolbar = () => {
//     const toolbar = toolbarEl.current;
//     if (!toolbar) {
//       return;
//     }
//     const parent = toolbar.parentElement;
//
//     // we must cache it because offsetWidth will be changed to the end of this
//     // function, but we need it there
//     const initialWidth = toolbar.offsetWidth;
//
//     if (typeof width !== 'number') {
//       setWidth(initialWidth);
//     }
//
//     let alignment = null;
//     let horizontalOffset = 0;
//
//     const native = window.getSelection();
//     const range = native.getRangeAt(0);
//     const selectionRect = range.getBoundingClientRect();
//     const parentRect = parent.getBoundingClientRect();
//     const parentStart = parentRect.left;
//     const parentEnd = parentRect.right;
//
//     const toolbarHalfWidth = toolbar.offsetWidth / 2;
//     // calculating the middle of the text selection
//     const fromBeginningToMiddle =
//       selectionRect.left - parentStart + selectionRect.width / 2;
//     // the same but against editor right side
//     const beforeParentEnd = parentRect.width - fromBeginningToMiddle;
//
//     const leftToolbarMargin = getMargin(toolbar);
//     const rightToolbarMargin = getMargin(toolbar, 'right');
//
//     // the selection is closer to parent beginning than half of the toolbar
//     // +-----------------------------------------------+
//     // |          vv toolbar                           |
//     // | +------------------+                          |
//     // | +------------------+                          |
//     // |                                               |
//     // |  +--+                                         |
//     // |   ^^ selection                                |
//     // +-----------------------------------------------+
//     if (fromBeginningToMiddle < toolbarHalfWidth + 2 * leftToolbarMargin) {
//       horizontalOffset = toolbarHalfWidth - leftToolbarMargin;
//       alignment = 'left';
//     } else if (beforeParentEnd < toolbarHalfWidth + 2 * rightToolbarMargin) {
//       // the same, but relative to the parent end
//       // +-----------------------------------------------+
//       // |                                 vvv toolbar   |
//       // |                            +---------------+  |
//       // |                            +---------------+  |
//       // |                                               |
//       // |                                      +--+     |
//       // |                             selection ^^      |
//       // |                                               |
//       // +-----------------------------------------------+
//       // shift computations are different for relative editor and body
//       horizontalOffset = -toolbarHalfWidth - rightToolbarMargin;
//       alignment = 'right';
//     } else {
//       // selection somewhere in the middle within the parent and there is a
//       // free place for toolbar
//       horizontalOffset =
//         selectionRect.left -
//         parentRect.left +
//         (selectionRect.width / 2 - leftToolbarMargin);
//     }
//
//     calculatePointerPosition(
//       alignment,
//       selectionRect,
//       fromBeginningToMiddle,
//       parentEnd,
//     );
//
//     toolbar.style.top = `${selectionRect.top -
//       parentRect.top -
//       toolbar.offsetHeight -
//       10}px`;
//     toolbar.style[alignment || 'left'] = `${horizontalOffset}px`;
//     toolbar.style.width = `${width || initialWidth}px`;
//     toolbar.style.transform = multiple(translateX('-50%'), scaleX(1));
//   };
//
//   useEffect(() => {
//     if (value instanceof Record) {
//       const { fragment, selection } = value;
//
//       if (
//         selection.isBlurred ||
//         selection.isCollapsed ||
//         fragment.text === ''
//       ) {
//         // skip disabling it twice
//         if (show) {
//           setShow(false);
//         }
//       } else {
//         // skip enabling it twice
//         if (!show) {
//           setShow(true);
//           // we need to wait a tick before toolbarEl ref will be ready
//           setTimeout(() => {
//             updateToolbar();
//           });
//         } else {
//           updateToolbar();
//         }
//       }
//     }
//   }, [value]);
//
//   if (!show) {
//     return null;
//   }
//
//   return (
//     <Portal container={editorRef.current}>
//       <>
//         {typeof pointerCSS === 'string' && (
//           <style>{`.${classes.root}::before, .${
//             classes.root
//           }::after${pointerCSS};`}</style>
//         )}
//         <div className={classes.root} ref={toolbarEl}>
//           {children}
//         </div>
//       </>
//     </Portal>
//   );
// }
