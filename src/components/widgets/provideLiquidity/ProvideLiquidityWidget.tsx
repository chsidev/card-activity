import { ASSET_LAKE, ASSET_LP_TOKEN } from '../../../constants/assets';
import { useContext, useEffect, useState } from 'react';

import { Button } from '../../button/Button';
import { GradientButton } from '../../button/gradient/GradientButton';
import { ProvideLiquidityModal } from './ProvideLiquidityModal';
import { WalletConnectContext } from '../../../context';
import { formatValue } from '../../../utils/formatValue';
import { parseBigNumber } from '../../../utils/parseBigNumber';
import { useConfig } from '../../../hooks/use-config';
import { useTokenBalance } from '@usedapp/core';

export const ProvideLiquidityWidget = () => {
    const { account } = useContext(WalletConnectContext);
    const { lakeAddress, lpTokenAddress } = useConfig();
    const [isPoolModalOpen, setIsPoolModalOpen] = useState(false);
    const [lakeBalance, setLakeBalance] = useState(0);
    const [lpTokenBalance, setLpTokenBalance] = useState(0);
    const lakeBalanceAsBigNumber = useTokenBalance(lakeAddress, account);
    const lpTokenBalanceAsBigNumber = useTokenBalance(lpTokenAddress, account);

    useEffect(() => {
        setBalances();
    }, [lakeBalanceAsBigNumber, lpTokenBalanceAsBigNumber]);

    const setBalances = () => {
        setLakeBalance(
            lakeBalanceAsBigNumber
                ? parseBigNumber(lakeBalanceAsBigNumber, ASSET_LAKE.decimals)
                : 0,
        );
        setLpTokenBalance(
            lpTokenBalanceAsBigNumber
                ? parseBigNumber(
                      lpTokenBalanceAsBigNumber,
                      ASSET_LP_TOKEN.decimals,
                  )
                : 0,
        );
    };

    const onProvideLiquidityClick = () => {
        setIsPoolModalOpen(true);
    };

    const closeModal = () => {
        setIsPoolModalOpen(false);
    };
    const onLpTokenStakingClick = () => {
        console.log('LP TOKEN STAKING');
    };
    const onRemoveLiquidityClick = () => {
        console.log('REMOVE LIQUIDITY');
    };

    return (
        <div className="w-full flex flex-col items-center mt-10 mb-4">
            <div className="w-full flex flex-col items-center">
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="PROVIDE LIQUIDITY"
                    onClick={onProvideLiquidityClick}
                />
                <span className="text-sm tracking-[.1em] my-2">
                    {formatValue(lakeBalance, ASSET_LAKE.symbol, 0)} AVAILABLE
                </span>
                <ProvideLiquidityModal
                    isOpen={isPoolModalOpen}
                    closeModal={closeModal}
                />
            </div>
            <div className="w-full flex flex-col items-center mt-6">
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="LP TOKEN STAKING"
                    onClick={onLpTokenStakingClick}
                />
                <span className="text-sm tracking-[.1em] my-2">
                    {formatValue(lpTokenBalance, ASSET_LP_TOKEN.symbol, 0)}{' '}
                    TOKENS AVAILABLE
                </span>
            </div>
            <div className="w-full flex flex-col items-center mt-8">
                <Button
                    size="medium"
                    disabled={false}
                    text="REMOVE LIQUIDITY"
                    onClick={onRemoveLiquidityClick}
                />
            </div>
        </div>
    );
};
