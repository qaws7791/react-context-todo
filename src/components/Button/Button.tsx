import styled, { css } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: 'submit' | 'reset' | 'button';
  children?: React.ReactNode | string;
  variant?: 'fill' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

type ButtonVariant = Pick<ButtonProps, 'variant' | 'size'>;

const SButton = styled.button<ButtonVariant>`
  font-size: 0.875rem;
  padding: 0.6em 1.2em;
  border: 2px solid #000;
  box-shadow: 2px 2px 0px 0 #000;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({variant}) => variant === 'fill' ? '#3c3c3c' : '#fff'};

  ${({size}) =>
    size === 'large' &&
    css`
      font-size: 1rem;
    `}

  ${({size}) =>
  size === 'small' &&
  css`
    font-size: 0.625rem;
  `}


  &:hover,
  &:focus {
    box-shadow: 1px 1px 0px 0 #000;
    transform: translate(1px,1px);
  }
`


const Button = ({
  onClick, 
  type='submit', 
  children='button',
  variant='outline', 
  size='medium',
  ...props
}:ButtonProps) => {
  return (
    <SButton
      variant={variant}
      type={type} 
      onClick={onClick} 
      size={size}
      {...props}
    >{children}</SButton>
  )
}

export default Button