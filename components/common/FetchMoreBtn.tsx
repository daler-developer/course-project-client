import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ComponentPropsWithRef } from "react";

const FetchMoreBtn = (
  props: Omit<ComponentPropsWithRef<typeof Button>, "shape" | "icon">
) => {
  return <Button shape="circle" icon={<PlusOutlined />} {...props} />;
};

export default FetchMoreBtn;
