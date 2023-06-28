import { JsonRpcProvider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import { useConfig } from './use-config';
import { useEthers } from '@usedapp/core';
import { useState } from 'react';


type InternalState = {
    loading: boolean;
    error?: string | null;
};

const initialState = {
    loading: false,
    error: null,
};

export type WalletConnectState = {
    loading: boolean;
    active: boolean;
    account: string | undefined;
    provider: any;
    library: JsonRpcProvider | undefined;
    error: string | null;
    activateProvider: () => void;
    deactivate: () => void;
    activateBrowserWallet: () => void;
    switchNetwork: (chainId: number) => void;
};

export const useWalletConnect = () => {
    const [internalState, setInternalState] =
        useState<InternalState>(initialState);

    const [provider, setProvider] = useState();

    const {
        isLoading,
        active,
        account,
        library,
        error,
        activate,
        deactivate,
        activateBrowserWallet,
        switchNetwork,
    } = useEthers();

    const { chainIdAsHex } = useConfig();

    const getWeb3Modal = () => {
        const providerOptions = {
            injected: {
                display: {
                    name: 'Metamask',
                    description: 'Connect with the provider in your Browser',
                },
                package: null,
            },
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: `${process.env.REACT_APP_INFURA_ID}`,
                    bridge: "wss://bridge.openmeta.xyz"
                },
            },
        };
        const web3Modal = new Web3Modal({
            network: 'mainnet',
            cacheProvider: true,
            disableInjectedProvider: false,
            providerOptions,
        });

        return web3Modal;
    };

    const activateProvider = async () => {
        setInternalState({
            ...internalState,
            loading: true,
        });

        const web3Modal = getWeb3Modal();

        try {
            const provider = await web3Modal.connect();
            await activate(provider);
            setProvider(provider);

            provider.on('chainChanged', async (chainId: string) => {
                if (chainId !== chainIdAsHex) {
                    handleDeactivate();
                }
            });

            setInternalState({
                ...internalState,
                error: null,
                loading: false,
            });
        } catch (error: any) {
            setInternalState({
                ...internalState,
                error: error,
                loading: false,
            });
        }
    };

    const handleDeactivate = () => {
        setProvider(undefined);
        deactivate();
        getWeb3Modal().clearCachedProvider();
    };

    return {
        loading: internalState.loading || isLoading,
        active,
        account,
        provider,
        library: library as JsonRpcProvider,
        error: internalState.error || error?.toString() || null,
        activateProvider,
        deactivate: handleDeactivate,
        activateBrowserWallet,
        switchNetwork,
    };
};
