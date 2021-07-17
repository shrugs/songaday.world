import WalletConnectProvider from '@walletconnect/web3-provider';
import { useCallback, useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import Web3Modal from 'web3modal';

let modal;
if (typeof window !== 'undefined') {
  modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: { infuraId: process.env.NEXT_PUBLIC_INFURA_ID },
      },
    },
  });
}

function useAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>(null);
  const [provider, setProvider] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setLoading(true);
    try {
      const provider = await modal.connect();
      const account = provider.selectedAddress ?? provider.accounts?.[0] ?? null;
      if (!account) throw new Error(`Unable to find selected account.`);
      setAccount(account);
      setProvider(provider);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    await modal.clearCachedProvider();
    setAccount(null);
    setProvider(null);
  }, []);

  useEffect(() => {
    if (modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  useEffect(() => {
    if (provider && provider.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      };
      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('disconnect', disconnect);

      // Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('disconnect', disconnect);
        }
      };
    }
  }, [provider, disconnect]);

  return { account, provider, loading, error, connect, disconnect };
}

export const Account = createContainer(useAccount);
