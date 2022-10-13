import { useEffect } from 'react';


type MouseMoveEventProp = {
  onMouseMove: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
};

export default function useMouseMoveEvent({onMouseMove, onMouseUp}: MouseMoveEventProp) {
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  });
}
