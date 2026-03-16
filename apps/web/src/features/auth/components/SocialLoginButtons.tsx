import styled from "@emotion/styled";

export const StyledSocialButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: none;
`;

export const StyledKakaoButton = styled(StyledSocialButton)`
  background-color: #fee500;
  color: #191919;

  &:hover {
    background-color: #fada00;
  }
`;

export const StyledGoogleButton = styled(StyledSocialButton)`
  background-color: #ffffff;
  color: #3c4043;
  border: 1px solid #dadce0;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const KakaoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 1C4.582 1 1 3.896 1 7.455c0 2.272 1.51 4.263 3.786 5.388L3.93 16.16a.25.25 0 0 0 .373.278L8.59 13.87c.135.01.272.015.41.015 4.418 0 8-2.896 8-6.43C17 3.896 13.418 1 9 1z"
      fill="#191919"
    />
  </svg>
);

export const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      fill="#34A853"
    />
    <path
      d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
      fill="#EA4335"
    />
  </svg>
);
