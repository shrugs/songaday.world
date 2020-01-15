import React, { useState, useCallback } from 'react';
import useLoginMutation from '../lib/mutators/useLoginMutation';
import AuthPage from '../components/AuthPage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [didLogin, setDidLogin] = useState(false);

  const doLogin = useLoginMutation();
  const handleEmail = useCallback(e => setEmail(e.target.value), []);
  const handleLogin = useCallback(async () => {
    await doLogin(email);
    setDidLogin(true);
  }, [doLogin, email]);

  return (
    <div className="flex flex-col">
      {!didLogin && (
        <>
          <input type="email" value={email} onChange={handleEmail}></input>
          <p>{email}</p>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
      {didLogin && <AuthPage />}
    </div>
  );
}
