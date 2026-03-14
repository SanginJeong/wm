import styled from "@emotion/styled";
import { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
};

const StyledIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radii.full};
  transition: background-color ${({ theme }) => theme.transitions.base};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[300]};
  }
`;

const IconButton = ({ icon, ...props }: IconButtonProps) => {
  return <StyledIconButton {...props}>{icon}</StyledIconButton>;
};

export default IconButton;
