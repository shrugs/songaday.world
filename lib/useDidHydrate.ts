import { useEffect, useState } from 'react';

export function useDidHydrate() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(true);
  }, []);

  return done;
}
