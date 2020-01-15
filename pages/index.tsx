import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import Avatar from '../components/minimann/Avatar';
import Header from '../components/minimann/Header';
import useLoginMutation from '../lib/mutators/useLoginMutation';
import useAuthMutation from '../lib/mutators/useAuthMutation';

export default function Home() {
  const doLogin = useLoginMutation();
  const doAuth = useAuthMutation();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleEmail = useCallback(e => setEmail(e.target.value), []);
  const handleLogin = useCallback(() => doLogin(email), [doLogin, email]);

  const handleCode = useCallback(e => setCode(e.target.value), []);
  const handleAuth = useCallback(() => doAuth(code), [code, doAuth]);

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-full">
        <div className="flex flex-col">
          <input type="email" value={email} onChange={handleEmail}></input>
          <p>{email}</p>
          <button onClick={handleLogin}>Login</button>

          <input type="text" value={code} onChange={handleCode}></input>
          <p>{code}</p>
          <button onClick={handleAuth}>Auth</button>
        </div>

        <div className="border border-black">
          <Header />
        </div>
        <div className="border border-black w-1/4 mt-1">
          <Avatar />
        </div>
      </main>

      <style jsx global>{`
        body {
          display: flex;
          width: 100%;
          height: 100%;
        }

        #__next {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}
