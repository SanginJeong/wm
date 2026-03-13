import styled from "@emotion/styled";
import { InputHTMLAttributes, forwardRef, useId } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
};

const Wrapper = styled.div<{ fullWidth?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const StyledInput = styled.input<{ error?: boolean }>`
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.gray[900]};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1.5px solid
    ${({ theme, error }) => (error ? theme.colors.error : theme.colors.gray[300])};
  border-radius: ${({ theme }) => theme.radii.md};
  width: 100%;
  transition: border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme, error }) =>
      error ? theme.colors.error : theme.colors.gray[400]};
  }

  &:focus {
    border-color: ${({ theme, error }) =>
      error ? theme.colors.error : theme.colors.primary[500]};
    box-shadow: 0 0 0 3px
      ${({ theme, error }) =>
        error ? `${theme.colors.error}25` : `${theme.colors.primary[500]}25`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.gray[400]};
    cursor: not-allowed;
  }
`;

const HelperText = styled.span<{ error?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme, error }) => (error ? theme.colors.error : theme.colors.gray[500])};
`;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, errorMessage, fullWidth, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const displayHelper = errorMessage ?? helperText;

    return (
      <Wrapper fullWidth={fullWidth}>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <StyledInput id={inputId} ref={ref} error={error} {...props} />
        {displayHelper && <HelperText error={error}>{displayHelper}</HelperText>}
      </Wrapper>
    );
  }
);

Input.displayName = "Input";

export default Input;
