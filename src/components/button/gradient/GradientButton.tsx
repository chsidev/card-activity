import { GradientButtonBase } from './GradientButtonBase';
import { Size } from '../Button';

interface Props {
    size: Size;
    disabled: boolean;
    text: string;
    onClick?: () => void;
}

export const GradientButton = ({ size, disabled, text, onClick }: Props) => (
    <GradientButtonBase size={size} disabled={disabled} onClick={onClick}>
        <div className="w-full flex justify-center px-2">
            <span
                className={`tracking-[.1em] font-medium font-kanit-medium ${
                    size === 'small'
                        ? 'text-xs'
                        : size === 'medium'
                        ? 'text-base'
                        : size === 'big'
                        ? 'text-xl'
                        : 'text-2xl'
                }`}
            >
                {text}
            </span>
        </div>
    </GradientButtonBase>
);
