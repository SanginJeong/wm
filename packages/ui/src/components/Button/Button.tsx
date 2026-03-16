import styled from "@emotion/styled";
import { ButtonHTMLAttributes, ElementType } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  as?: ElementType;
  to?: string;
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  cursor: pointer;

  /* size */
  ${({ size = "md", theme }) => {
    const sizes = {
      sm: `
        font-size: ${theme.typography.fontSize.sm};
        padding: ${theme.spacing[1]} ${theme.spacing[3]};
        height: 32px;
      `,
      md: `
        font-size: ${theme.typography.fontSize.md};
        padding: ${theme.spacing[2]} ${theme.spacing[4]};
        height: 40px;
      `,
      lg: `
        font-size: ${theme.typography.fontSize.lg};
        padding: ${theme.spacing[3]} ${theme.spacing[6]};
        height: 48px;
      `,
    };
    return sizes[size];
  }}

  /* variant */
  ${({ variant = "primary", theme }) => {
    const variants = {
      primary: `
        background-color: ${theme.colors.primary[500]};
        color: ${theme.colors.white};
        border: 2px solid transparent;
        &:hover:not(:disabled) { background-color: ${theme.colors.primary[600]}; }
        &:active:not(:disabled) { background-color: ${theme.colors.primary[700]}; }
      `,
      secondary: `
        background-color: ${theme.colors.accent[500]};
        color: ${theme.colors.white};
        border: 2px solid transparent;
        &:hover:not(:disabled) { background-color: ${theme.colors.accent[600]}; }
        &:active:not(:disabled) { background-color: ${theme.colors.accent[700]}; }
      `,
      outline: `
        background-color: transparent;
        color: ${theme.colors.primary[500]};
        border: 2px solid ${theme.colors.primary[500]};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary[50]};
        }
        &:active:not(:disabled) {
          background-color: ${theme.colors.primary[100]};
        }
      `,
      ghost: `
        background-color: transparent;
        color: ${theme.colors.gray[700]};
        border: 2px solid transparent;
        &:hover:not(:disabled) { background-color: ${theme.colors.gray[100]}; }
        &:active:not(:disabled) { background-color: ${theme.colors.gray[200]}; }
      `,
    };
    return variants[variant];
  }}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;

const Button = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  as,
  to,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton as={as} to={to} variant={variant} size={size} fullWidth={fullWidth} {...props} />
  );
};

export default Button;
