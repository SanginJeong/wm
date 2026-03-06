import { Header, Footer } from "@/components/layout";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
