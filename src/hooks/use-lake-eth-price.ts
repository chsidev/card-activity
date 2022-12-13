import { JsonRpcProvider } from '@ethersproject/providers';
import { useConfig } from './use-config';
import { useUniswapPool } from './use-uniswap-pool';

export const useLakeEthPrice = async (
    provider: JsonRpcProvider,
    blockTag?: number,
): Promise<number> => {
    const { lakeAddress, wethAddress } = useConfig();
    const pool = await useUniswapPool(
        provider,
        wethAddress,
        lakeAddress,
        blockTag,
    );
    return Number(pool.token1Price.toSignificant());
};
