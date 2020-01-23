import React, { PropsWithChildren, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { animated, useTransition } from 'react-spring';

export default function SidePanel({
  children,
  open,
  onRequestClose,
}: PropsWithChildren<{ open: boolean; onRequestClose: () => void }>) {
  // always render modal on second render because next expects server html to equal first render
  // https://spectrum.chat/next-js/general/warning-expected-server-html-to-contain-a-matching-i-in-li~9ff45be2-74b7-4d08-a782-4b3210f1dfec
  const [renderPortal, setRenderPortal] = useState(false);
  useEffect(() => {
    setRenderPortal(true);
  }, []);

  const transitions = useTransition(open, null, {
    from: { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(100%)' },
  });

  if (typeof window === 'undefined' || !renderPortal) {
    return null;
  }

  return createPortal(
    <>
      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.div key={key} style={props} className="h-screen flex flex-col">
            {children}
          </animated.div>
        ) : null,
      )}
    </>,
    document.getElementById('modal-root'),
  );
}
