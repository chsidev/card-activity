import { ASSET_ETH, ASSET_LAKE } from '../../constants/assets';

import { Button } from '../button/Button';
import { ButtonWithIcon } from '../button/ButtonWithIcon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GradientButtonWithIcon } from '../button/gradient/GradientButtonWithIcon';
import { WalletConnectContext } from '../../context';
import copyIcon from './../../assets/icons/copy-icon.svg';
import { formatAddress } from '../../utils/formatAddress';
import { formatValue } from '../../utils/formatValue';
import horizontalLogo from './../../assets/icons/horizontal-logo.png';
import keyIcon from './../../assets/icons/key-icon.svg';
import { useContext } from 'react';

export const Navigation = () => {
    const { account, ethBalance, tokenBalance, activateProvider } =
        useContext(WalletConnectContext);

    const activate = async () => {
        await activateProvider();
    };

    return (
        <nav className="relative flex flex-wrap items-center justify-between px-8 py-2 bg-black-500">
            <div className="w-full flex flex-wrap items-center justify-between">
                <div>
                    <img
                        className="w-[24rem] pl-8"
                        src={horizontalLogo}
                        alt="logo"
                    ></img>
                </div>

                <div className="flex items-center justify-end">
                    {account ? (
                        <>
                            <Button
                                size="big"
                                disabled={true}
                                text={`${formatValue(
                                    tokenBalance,
                                    ASSET_LAKE.symbol,
                                    2,
                                )} | ${formatValue(
                                    ethBalance,
                                    ASSET_ETH.symbol,
                                    4,
                                )}`}
                            ></Button>

                            <div className="ml-6">
                                <ButtonWithIcon
                                    size="big"
                                    disabled={true}
                                    text={formatAddress(account)}
                                >
                                    <CopyToClipboard text={account}>
                                        <img
                                            className="cursor-pointer"
                                            src={copyIcon}
                                            alt="copy"
                                        ></img>
                                    </CopyToClipboard>
                                </ButtonWithIcon>
                            </div>
                        </>
                    ) : (
                        <GradientButtonWithIcon
                            size="big"
                            disabled={false}
                            text="CONNECT WALLET"
                            onClick={activate}
                        >
                            <img src={keyIcon} alt="key"></img>
                        </GradientButtonWithIcon>
                    )}
                </div>
            </div>
        </nav>
    );
};
