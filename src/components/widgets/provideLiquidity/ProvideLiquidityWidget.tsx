import { Button } from '../../button/Button';
import { GradientButton } from '../../button/gradient/GradientButton';

export const ProvideLiquidityWidget = () => {
    const onProvideLiquidityClick = () => {
        console.log('Provide liquidity');
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
                    2700 $LAKE AVAILABLE
                </span>
            </div>
            <div className="w-full flex flex-col items-center mt-6">
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="LP TOKEN STAKING"
                    onClick={onLpTokenStakingClick}
                />
                <span className="text-sm tracking-[.1em] my-2">
                    700 LP TOKENS AVAILABLE
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
