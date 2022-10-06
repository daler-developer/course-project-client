import {
  DeleteOutlined,
  EllipsisOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import useDeleteItemMutation from "../../hooks/mutations/items/useDeleteItemMutation";
import useLikeItemMutation from "../../hooks/mutations/items/useLikeItemMutation";
import useUnlikeItemMutation from "../../hooks/mutations/items/useUnlikeItemMutation";
import { IItem } from "../../types";

interface IProps {
  item: IItem;
}

const Item = ({ item }: IProps) => {
  const likeItemMutation = useLikeItemMutation({ itemId: item._id });
  const unlikeItemMutation = useUnlikeItemMutation({ itemId: item._id });
  const deleteItemMutation = useDeleteItemMutation({ itemId: item._id });

  const handleDelete = () => deleteItemMutation.mutate();
  const handleLike = () => likeItemMutation.mutate();
  const handleUnlike = () => unlikeItemMutation.mutate();

  return <Table columns={columns} dataSource={item.fie} />;

  return (
    <div className="shadow-lg p-[10px] bg-white">
      <div className="">
        {Object.keys(item.fields.text).map((field) => (
          <div className="">
            {field}: {item.fields.text[field]}
          </div>
        ))}
        {Object.keys(item.fields.boolean).map((field) => (
          <div className="">
            {field}: {item.fields.boolean[field] ? "Yes" : "No"}
          </div>
        ))}
      </div>

      <div className="mt-[20px] flex items-center gap-[5px]">
        <Button onClick={handleLike} shape="circle" icon={<HeartFilled />} />
        <Button
          onClick={handleUnlike}
          danger
          shape="circle"
          icon={<HeartFilled />}
        />
        <Button
          onClick={handleDelete}
          shape="circle"
          danger
          icon={<DeleteOutlined />}
        />
      </div>
    </div>
  );
};

export default Item;
