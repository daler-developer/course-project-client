import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ICollection, IItem } from "../../types";
import NextLink from "next/link";

interface IProps {
  collection: ICollection;
  items: IItem[];
  isFetching: boolean;
  onFetchNextPage: () => void;
}

const Items = ({ items, isFetching, onFetchNextPage, collection }: IProps) => {
  const columns = (() => {
    const list: ColumnsType<object> = [];

    list.push({
      key: "_id",
      title: "_id",
      dataIndex: `_id`,
    });

    collection.fields.text.forEach((field) => {
      list.push({
        key: field,
        title: field,
        dataIndex: `fields`,
        render(fields: any) {
          return <div className="">{fields.text[field]}</div>;
        },
      });
    });

    collection.fields.date.forEach((field) => {
      list.push({
        key: field,
        title: field,
        dataIndex: `fields`,
        render(fields: any) {
          return <div className="">{fields.date[field]}</div>;
        },
      });
    });

    list.push({
      key: "menu",
      title: null,
      dataIndex: `_id`,
      render(_id: string) {
        return (
          <NextLink href={`/item/${_id}`} passHref>
            <Button type="link" size="small">
              Open
            </Button>
          </NextLink>
        );
      },
    });

    return list;
  })();

  return (
    <div className="">
      <Table columns={columns} dataSource={items} />

      {isFetching ? (
        <div className="text-center mt-[20px]">
          <Spin />
        </div>
      ) : (
        <div className="text-center">
          <Button
            onClick={() => onFetchNextPage()}
            className="mt-[20px]"
            shape="circle"
            icon={<PlusOutlined />}
          />
        </div>
      )}
    </div>
  );
};

export default Items;
