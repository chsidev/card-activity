import { BrowserRouter } from 'react-router-dom';
import { DAppProvider } from '@usedapp/core';
import { GlobalStyle } from './providers/GlobalStyle';
import { ReactNode } from 'react';
import { WalletConnectProvider } from './providers/WalletConnectProvider';
import { useConfig } from './hooks/use-config';

interface Props {
    children: ReactNode;
}

export const Providers = ({ children }: Props) => {
    const { getDappConfig } = useConfig();
    return (
        <DAppProvider config={getDappConfig()}>
            <WalletConnectProvider>
                <BrowserRouter>
                    <GlobalStyle />
                    {children}
                </BrowserRouter>
            </WalletConnectProvider>
        </DAppProvider>
    );
};
