import { Contract } from 'ethers';
import { nonfungiblePositionManagerAbi } from '../abis/nonfungiblePositionManager';
import { parseBigNumber } from '../utils/parseBigNumber';
import { useConfig } from './use-config';

export const useTokenIdOfPosition = async (
    account: string,
    provider: any,
): Promise<number | undefined> => {
    try {
        const { usdtAddress, lakeAddress, nonfungiblePositionManagerAddress } =
            useConfig();
        const uniswapV3PosContract = new Contract(
            nonfungiblePositionManagerAddress,
            nonfungiblePositionManagerAbi,
            provider,
        );
        const positionsCount = await uniswapV3PosContract.callStatic.balanceOf(
            account,
        );

        if (positionsCount > 0) {
            for (let i = 0; i < positionsCount; i++) {
                const positionId =
                    await uniswapV3PosContract.callStatic.tokenOfOwnerByIndex(
                        account,
                        i,
                    );

                const position =
                    await uniswapV3PosContract.callStatic.positions(positionId);

                if (
                    position.token0.toLowerCase() ===
                        usdtAddress.toLowerCase() &&
                    position.token1.toLowerCase() === lakeAddress.toLowerCase()
                ) {
                    return parseBigNumber(positionId, 0);
                }
            }
        }
    } catch (e) {
        console.error('Failed to get token id', e);
    }
    return;
};
