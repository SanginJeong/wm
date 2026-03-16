import styled from "@emotion/styled";
import { Button, Input } from "@wondermall/ui";
import { KakaoIcon, GoogleIcon, StyledKakaoButton, StyledGoogleButton } from "./SocialLoginButtons";
import { Link } from "react-router";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const StyledDivider = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

const LoginForm = () => {
  return (
    <StyledForm>
      <Input label="이메일" placeholder="Enter Email..." />
      <Input label="패스워드" placeholder="Enter Password..." />
      <Button variant="primary">로그인</Button>
      <Button as={Link} to="/auth/signup" variant="outline">
        회원가입
      </Button>
      <StyledDivider>또는</StyledDivider>
      <StyledKakaoButton type="button">
        <KakaoIcon />
        카카오로 로그인
      </StyledKakaoButton>
      <StyledGoogleButton type="button">
        <GoogleIcon />
        Google로 로그인
      </StyledGoogleButton>
    </StyledForm>
  );
};

export default LoginForm;
