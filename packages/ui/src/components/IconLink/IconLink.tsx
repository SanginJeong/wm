import styled from "@emotion/styled";
import { AnchorHTMLAttributes, ElementType, ReactNode } from "react";

type IconLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon: ReactNode;
  as?: ElementType;
  to?: string;
};

const StyledIconLink = styled.a<{ to?: string }>`
  display: inline-flex;
  align-items: center;
  color: inherit;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radii.full};
  transition: background-color ${({ theme }) => theme.transitions.base};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary[300]};
  }
`;

const IconLink = ({ icon, as, to, ...props }: IconLinkProps) => {
  return (
    <StyledIconLink as={as} to={to} {...props}>
      {icon}
    </StyledIconLink>
  );
};

export default IconLink;
