import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";
import './style/button.scss';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => (
    <button {...props} className={props.className?.concat(' poke-button') ?? 'poke-button'}>
        {children}
    </button>
);

export default Button;