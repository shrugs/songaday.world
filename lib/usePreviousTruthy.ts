import { useRef, useEffect } from 'react';

// Hook

export default function usePrevious<T>(value: T, initialValue?: T) {
  const ref = useRef<T>(initialValue);

  useEffect(() => {
    if (value) {
      ref.current = value;
    }
  }, [value]);

  return ref.current;
}
