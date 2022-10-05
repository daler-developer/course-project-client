import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import useDeleteCollectionMutation from "../../hooks/mutations/collections/useDeleteCollectionMutation";
import { ICollection } from "../../types";
import NextLink from "next/link";

interface IProps {
  collection: ICollection;
}

const Collection = ({ collection }: IProps) => {
  const deleteCollectionMutation = useDeleteCollectionMutation({
    collectionId: collection._id,
  });

  const handleDelete = () => deleteCollectionMutation.mutate();

  return (
    <div className="p-[10px] flex items-center justify-between rounded-[5px] border border-solid border-gray-500 bg-white">
      <span className="text-[18px] font-[500]">
        <NextLink href={`/collection/${collection._id}`}>
          {collection.name}
        </NextLink>
      </span>

      <Dropdown
        overlay={
          <Menu
            items={[
              {
                key: 1,
                danger: true,
                label: <div onClick={handleDelete}>Delete</div>,
              },
            ]}
          />
        }
      >
        <Button shape="circle" icon={<EllipsisOutlined />} />
      </Dropdown>
    </div>
  );
};

export default Collection;
