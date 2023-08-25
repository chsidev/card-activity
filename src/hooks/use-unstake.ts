import { JsonRpcProvider } from '@ethersproject/providers';
import { useConfig } from './use-config';
import { Contract } from 'ethers';
import { END_TIME, START_TIME } from '../constants/mainnet';
import { uniswapV3StakerAbi } from '../abis/uniswapV3Staker';

export const useUnstake = async (
    provider: JsonRpcProvider,
    account: string,
    tokenId: number,
    poolAddress: string,
): Promise<void> => {
    const { uniswapV3StakerAddress, lakeAddress } = useConfig();
    const stakerContract = new Contract(
        uniswapV3StakerAddress,
        uniswapV3StakerAbi,
        provider.getSigner(),
    );

    const unstakeTxn = await stakerContract.unstakeToken(
        {
            rewardToken: lakeAddress,
            pool: poolAddress,
            startTime: START_TIME,
            endTime: END_TIME,
            refundee: account,
        },
        tokenId,
    );
    await unstakeTxn.wait();
    const withdrawTxn = await stakerContract.withdrawToken(
        tokenId,
        account,
        '0x',
    );
    await withdrawTxn.wait();
};
