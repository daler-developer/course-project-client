import { Drawer as AntDDraewr } from "antd";
import useIsAuthenticated from "../hooks/common/useIsAuthenticated";
import useStore from "../store";
import AuthNav from "./common/AuthNav";
import LogoutBtn from "./common/LogoutBtn";
import Nav from "./common/Nav";
import SwitchLang from "./common/SwitchLang";
import SwitchTheme from "./common/SwitchTheme";

interface IProps {}

const Drawer = ({}: IProps) => {
  const { isDrawerOpen, closeDrawer } = useStore();

  const isAuthenticated = useIsAuthenticated();

  return (
    <AntDDraewr
      placement="left"
      open={isDrawerOpen}
      onClose={closeDrawer}
      extra={isAuthenticated ? <LogoutBtn /> : <AuthNav />}
    >
      <Nav direction="column" />
      {isAuthenticated && (
        <>
          <div className="mt-[5px]">
            <SwitchLang />
          </div>
          <div className="mt-[5px]">
            <SwitchTheme />
          </div>
        </>
      )}
    </AntDDraewr>
  );
};

export default Drawer;
