import { ButtonBase } from './ButtonBase';

export type Size = 'small' | 'medium' | 'big' | 'huge';
interface Props {
    size: Size;
    disabled: boolean;
    text: string;
    onClick?: () => void;
}

export const Button = ({ size, disabled, text, onClick }: Props) => (
    <ButtonBase size={size} disabled={disabled} onClick={onClick}>
        <span
            className={`color-gradient-light tracking-[.1em] ${
                size === 'small'
                    ? 'text-xs'
                    : size === 'medium'
                    ? 'text-base'
                    : size === 'big'
                    ? 'text-xl'
                    : 'text-2xl font-medium font-kanit-medium'
            }`}
        >
            {text}
        </span>
    </ButtonBase>
);
