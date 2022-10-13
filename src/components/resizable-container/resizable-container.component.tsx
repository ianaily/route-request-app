import React, { useState } from 'react';

import useMouseMoveEvent from 'src/hooks/use-mouse-move-event.hook';
import './resizable-container.style.css';

type ResizableContainerProps = {
  left: JSX.Element;
  right: JSX.Element;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
};

export default function ResizableContainer({
                                             left,
                                             right,
                                             minWidth = 18,
                                             maxWidth = 70,
                                             defaultWidth = 30
                                           }: ResizableContainerProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(defaultWidth);

  const onMouseDown = () => {
    setIsResizing(true);
  };

  const onMouseUp = () => {
    setIsResizing(false);
  };

  const onMouseMove = (e: any) => {
    e.stopPropagation();

    if (!isResizing) {
      return
    }

    const offsetLeft = (e.clientX * 100) / document.body.clientWidth;

    if (offsetLeft > minWidth && offsetLeft < maxWidth) {
      setWidth(offsetLeft);
    }
  };

  useMouseMoveEvent({onMouseMove, onMouseUp});

  const leftWidthPercent = width.toFixed(2);
  const rightWidthPercent = (100 - width).toFixed(2);

  return (
    <>
      <div style={{width: `${leftWidthPercent}vw`}}>
        <div
          className="splitter"
          style={{left: `${width}vw`}}
          onMouseDown={onMouseDown}
        />
        {left}
      </div>
      <div style={{width: `${rightWidthPercent}vw`}}>
        {right}
      </div>
    </>
  );
};
