import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  });
  const leftWidthPercent = width.toFixed(2);
  const rightWidthPercent = (100 - width).toFixed(2);

  return (
    <>
      <div style={{width: `${leftWidthPercent}vw`}}>
        <div
          style={{
            position: 'absolute',
            width: '5px',
            top: 0,
            left: `${width}vw`,
            bottom: 0,
            zIndex: 500,
            cursor: 'ew-resize',
            backgroundColor: '#fdfcff'
          }}
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
