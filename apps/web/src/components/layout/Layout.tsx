import styled from "@emotion/styled";
import { Header, Footer } from "@/components/layout";
import { Outlet } from "react-router";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const StyledMain = styled.main`
  flex: 1;
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }
`;

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const Layout = () => {
  return (
    <StyledPage>
      <StyledHeader>
        <Container>
          <Header />
        </Container>
      </StyledHeader>
      <StyledMain>
        <Container>
          <Outlet />
        </Container>
      </StyledMain>
      <StyledFooter>
        <Container>
          <Footer />
        </Container>
      </StyledFooter>
    </StyledPage>
  );
};

export default Layout;
