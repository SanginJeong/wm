import styled from "@emotion/styled";
import { Link } from "react-router";
import { IconLink, Input, theme } from "@wondermall/ui";
import { HeartIcon, LogInIcon, ShoppingCartIcon, UserIcon } from "lucide-react";

const StyledHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} 0;
`;

const StyledTitle = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary[500]};
  text-decoration: none;
`;

const StyledAuthActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const Header = () => {
  const isLoggedIn = true;

  return (
    <StyledHeaderContent>
      <StyledTitle to="/">WonderMall</StyledTitle>
      <Input placeholder="상품 검색..." />

      {isLoggedIn ? (
        <StyledAuthActions>
          <IconLink to="/mypage/wishlist" icon={<HeartIcon />} />
          <IconLink to="/mypage/cart" icon={<ShoppingCartIcon />} />
          <IconLink to="/mypage" icon={<UserIcon />} />
        </StyledAuthActions>
      ) : (
        <IconLink to="/auth/login" icon={<LogInIcon />} />
      )}
    </StyledHeaderContent>
  );
};

export default Header;
