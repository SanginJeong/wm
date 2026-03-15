import styled from "@emotion/styled";
import { Link } from "react-router";
import { IconLink, Input } from "@wondermall/ui";
import { HeartIcon, LogInIcon, ShoppingCartIcon, UserIcon } from "lucide-react";

const StyledHeaderContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} 0;
  gap: ${({ theme }) => theme.spacing[2]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-wrap: nowrap;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const StyledTitle = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary[500]};
  text-decoration: none;
`;

const StyledInputWrapper = styled.div`
  order: 1;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    order: 0;
    width: auto;
    flex: 1;
    max-width: 400px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 600px;
  }
`;

const StyledAuthActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  margin-left: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
  }
`;

const Header = () => {
  const isLoggedIn = true;

  return (
    <StyledHeaderContent>
      <StyledTitle aria-label="제목" to="/">
        WonderMall
      </StyledTitle>

      <StyledInputWrapper>
        <Input aria-label="상품 검색" placeholder="상품 검색..." fullWidth />
      </StyledInputWrapper>

      {isLoggedIn ? (
        <StyledAuthActions>
          <IconLink aria-label="위시 리스트" to="/mypage/wishlist" icon={<HeartIcon />} />
          <IconLink aria-label="장바구니" to="/mypage/cart" icon={<ShoppingCartIcon />} />
          <IconLink aria-label="마이페이지" to="/mypage" icon={<UserIcon />} />
        </StyledAuthActions>
      ) : (
        <IconLink aria-label="로그인" to="/auth/login" icon={<LogInIcon />} />
      )}
    </StyledHeaderContent>
  );
};

export default Header;
