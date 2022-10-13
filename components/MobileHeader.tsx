import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useStore from "../store";
import SearchInput from "./common/SearchInput";
import Container from "./Container";

const MobileHeader = () => {
  const { openDrawer } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 shadow-md z-50 bg-white dark:bg-black">
      <Container>
        <div className="h-[50px] flex items-center justify-between">
          <SearchInput />
          <Button icon={<MenuOutlined />} onClick={() => openDrawer()} />
        </div>
      </Container>
    </header>
  );
};

export default MobileHeader;
