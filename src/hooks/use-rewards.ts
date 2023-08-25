import { JsonRpcProvider } from '@ethersproject/providers';
import { useStakerContract } from './use-staker-contract';
import { useConfig } from './use-config';
import { parseBigNumber } from '../utils/parseBigNumber';

export const useRewards = async (
    provider: JsonRpcProvider,
    account: string,
): Promise<number> => {
    const { lakeAddress } = useConfig();
    const stakingContract = useStakerContract(provider);
    const rewardsAsBigNumber = await stakingContract.callStatic.rewards(
        lakeAddress,
        account,
    );
    return parseBigNumber(rewardsAsBigNumber);
};
