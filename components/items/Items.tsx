import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ICollection, IItem } from "../../types";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface IProps {
  collection: ICollection;
  items: IItem[];
  isFetching: boolean;
  onFetchNextPage: () => void;
}

const Items = ({ items, isFetching, onFetchNextPage, collection }: IProps) => {
  // const [columns, setColumns] = useState<ColumnsType<object>>([]);

  const { t } = useTranslation();

  // useEffect(() => {
  //   generateColumns();
  // }, []);

  // const generateColumns = () => {
  //   const list: ColumnsType<object> = [];

  //   list.push({
  //     key: "name",
  //     title: "Name",
  //     dataIndex: `name`,
  //   });

  //   const numColumnsGenerated = 0;

  //   for (let fieldType of Object.keys(collection.fields)) {
  //     if ((collection.fields as any)[fieldType].length) {
  //       (collection.fields as any)[fieldType].forEach((field: any) => {
  //         list.push({
  //           key: field,
  //           title: field,
  //           dataIndex: `fields`,
  //           render(fields: any) {
  //             return <div className="">{fields.text[field]}</div>;
  //           },
  //         });
  //       });
  //     }
  //   }
  // };

  const columns = (() => {
    const list: ColumnsType<object> = [];

    list.push({
      key: "name",
      title: "Name",
      dataIndex: `name`,
    });

    if (collection.fields.text) {
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
    }

    if (collection.fields.date) {
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
    }

    list.push({
      key: "menu",
      title: "Link",
      dataIndex: `_id`,
      render(_id: string) {
        return (
          <NextLink href={`/items/${_id}`} passHref>
            <Button type="link" size="small">
              {t("links:open")}
            </Button>
          </NextLink>
        );
      },
    });

    return list;
  })();

  return (
    <div className="overflow-x-auto">
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
