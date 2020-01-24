import React, { useState, useCallback } from 'react';
import useAuthMutation from '../lib/mutators/useAuthMutation';
import useQueryParams from '../lib/useQueryParams';
import { useRouter } from 'next/router';

export default function AuthPage({ initialCode = '' }: { initialCode?: string }) {
  const doAuth = useAuthMutation();
  const [code, setCode] = useState(initialCode);
  const [{ to }] = useQueryParams();
  const router = useRouter();

  const handleCode = useCallback(e => setCode(e.target.value), []);
  const handleAuth = useCallback(async () => {
    await doAuth(code);
    router.push(to || '/profile');
  }, [code, doAuth, router, to]);

  return (
    <div className="flex flex-col">
      <input type="text" value={code} onChange={handleCode}></input>
      <p>{code}</p>
      <button onClick={handleAuth}>Auth</button>
    </div>
  );
}
