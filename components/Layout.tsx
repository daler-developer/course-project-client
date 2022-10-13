import { useMediaQuery } from "@mui/material";
import useIsTablet from "../hooks/common/useIsTablet";
import Container from "./Container";
import Drawer from "./Drawer";
import Header from "./Header";
import MobileHeader from "./MobileHeader";

const Layout = ({ children }: { children: any }) => {
  const isTablet = useIsTablet();

  return (
    <>
      <div className="pt-[70px] pb-[70px] min-h-screen dark:bg-slate-400">
        {isTablet ? <MobileHeader /> : <Header />}
        <Container>{children}</Container>
        <Drawer />
      </div>
    </>
  );
};

export default Layout;
