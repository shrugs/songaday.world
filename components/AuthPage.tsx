import React, { useState, useCallback } from 'react';
import useAuthMutation from '../lib/mutators/useAuthMutation';
import Router from 'next/router';

export default function AuthPage({ initialCode = '' }: { initialCode?: string }) {
  const doAuth = useAuthMutation();
  const [code, setCode] = useState(initialCode);

  const handleCode = useCallback(e => setCode(e.target.value), []);
  const handleAuth = useCallback(async () => {
    await doAuth(code);
    Router.push('/profile');
  }, [code, doAuth]);

  return (
    <div className="flex flex-col">
      <input type="text" value={code} onChange={handleCode}></input>
      <p>{code}</p>
      <button onClick={handleAuth}>Auth</button>
    </div>
  );
}
