import React, { PropsWithChildren, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { animated, useTransition } from 'react-spring';
import useOnClickOutside from '../lib/useOnClickOutside';
import useKeyPress from '../lib/useKeypress';

export default function SidePanel({
  children,
  open,
  onRequestClose,
}: PropsWithChildren<{ open: boolean; onRequestClose: () => void }>) {
  const ref = useRef<HTMLDivElement>();

  useOnClickOutside(ref, onRequestClose);
  const escPressed = useKeyPress('Escape');
  useEffect(() => {
    if (open && escPressed) {
      onRequestClose();
    }
  }, [escPressed, onRequestClose, open]);

  // always render modal on second render because next expects server html to equal first render
  // https://spectrum.chat/next-js/general/warning-expected-server-html-to-contain-a-matching-i-in-li~9ff45be2-74b7-4d08-a782-4b3210f1dfec
  const [renderPortal, setRenderPortal] = useState(false);
  useEffect(() => {
    setRenderPortal(true);
  }, []);

  const panelTransitions = useTransition(open, null, {
    from: { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(100%)' },
  });

  const backgroundTransitions = useTransition(open, null, {
    from: { opacity: 0 },
    enter: { opacity: 0.5 },
    leave: { opacity: 0 },
  });

  if (typeof window === 'undefined' || !renderPortal) {
    return null;
  }

  return createPortal(
    <>
      {backgroundTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="bg-black absolute top-0 right-0 h-full w-full"
            ></animated.div>
          ),
      )}
      {panelTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props} className="h-screen flex flex-col">
              <div className="max-h-screen w-screen overflow-y-scroll flex-grow flex flex-col w-full items-end">
                <div ref={ref} className="w-full flex-grow bg-main">
                  {children}
                </div>
              </div>
            </animated.div>
          ),
      )}
    </>,
    document.getElementById('modal-root'),
  );
}
