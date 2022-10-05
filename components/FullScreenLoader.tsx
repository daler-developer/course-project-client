import { Spin } from "antd";

interface IProps {}

const FullScreenLoader = ({}: IProps) => {
  return (
    <div
      role="screen-loader"
      className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center z-50 bg-white"
    >
      <Spin size="large" />
    </div>
  );
};

export default FullScreenLoader;
