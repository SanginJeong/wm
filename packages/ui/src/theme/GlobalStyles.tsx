import { Global, css, useTheme } from "@emotion/react";

const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          font-size: 16px;
          -webkit-text-size-adjust: 100%;
        }

        body {
          font-family: ${theme.typography.fontFamily.base};
          font-size: ${theme.typography.fontSize.md};
          font-weight: ${theme.typography.fontWeight.regular};
          line-height: ${theme.typography.lineHeight.normal};
          color: ${theme.colors.gray[900]};
          background-color: ${theme.colors.gray[50]};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          cursor: pointer;
          border: none;
          background: none;
          font-family: inherit;
        }

        input,
        textarea,
        select {
          font-family: inherit;
        }

        img,
        video {
          max-width: 100%;
          display: block;
        }

        ul,
        ol {
          list-style: none;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: ${theme.typography.fontWeight.bold};
          line-height: ${theme.typography.lineHeight.tight};
        }
      `}
    />
  );
};

export default GlobalStyles;
