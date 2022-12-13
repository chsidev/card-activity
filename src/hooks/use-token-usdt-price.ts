import { JsonRpcProvider } from '@ethersproject/providers';
import { useConfig } from './use-config';
import { useUniswapPool } from './use-uniswap-pool';

export const useTokenUsdtPrice = async (
    provider: JsonRpcProvider,
    tokenAddress: string,
    blockTag?: number,
): Promise<number> => {
    const { usdtAddress } = useConfig();
    const pool = await useUniswapPool(
        provider,
        usdtAddress,
        tokenAddress,
        blockTag,
    );
    return pool.token0.address.toLowerCase() === usdtAddress.toLocaleLowerCase()
        ? Number(pool.token1Price.toSignificant())
        : Number(pool.token0Price.toSignificant());
};
