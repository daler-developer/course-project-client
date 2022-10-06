import { Button } from "antd";
import { EllipsisOutlined as DotsIcon } from "@ant-design/icons";
import { ComponentPropsWithRef } from "react";

const MenuButton = (props: ComponentPropsWithRef<typeof Button>) => {
  return <Button shape="circle" icon={<DotsIcon />} {...props} />;
};

export default MenuButton;
