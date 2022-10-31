import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ICollection, IItem } from "../../types";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

interface IProps {
  collection: ICollection;
  items: IItem[];
  isFetching: boolean;
  onFetchNextPage: () => void;
}

const Items = ({ items, isFetching, onFetchNextPage, collection }: IProps) => {
  const { t } = useTranslation();

  const allNames = useRef(new Set(items.map((item) => item.name)));

  const columns = (() => {
    const list: ColumnsType<IItem> = [];

    list.push({
      key: "name",
      title: "Name",
      dataIndex: `name`,
      filters: [...allNames.current].map((name) => ({
        text: name,
        value: name,
      })),
      onFilter(value, record) {
        return record.name === value;
      },
    });

    if (collection.fields.integer) {
      collection.fields.integer.forEach((field) => {
        list.push({
          key: field,
          title: field,
          dataIndex: `fields`,
          render(fields: any) {
            return <div className="">{fields.integer[field]}</div>;
          },
          sorter(a, b) {
            return b.fields.integer[field] - a.fields.integer[field];
          },
        });
      });
    }

    if (collection.fields.boolean) {
      collection.fields.boolean.forEach((field) => {
        list.push({
          key: field,
          title: field,
          dataIndex: `fields`,
          sorter(a, b) {
            if (a.fields.boolean[field] && !b.fields.boolean[field]) {
              return -1;
            }
            if (!a.fields.boolean[field] && b.fields.boolean[field]) {
              return 1;
            }
            return 0;
          },
          render(fields: any) {
            return (
              <div className="">
                {fields.boolean[field] ? t("common:yes") : t("common:no")}
              </div>
            );
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
