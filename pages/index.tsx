import NextLink from "next/link";
import { Spin, Table, Tag, Typography } from "antd";
import useGetLatestItemsQuery from "../hooks/queries/items/useGetLatestItemsQuery";
import { ICollection, IUser } from "../types";
import useGetLargestCollectionsQuery from "../hooks/queries/collections/useGetLargestCollectionsQuery";
import Collections from "../components/collections/Collections";
import useGetTagsQuery from "../hooks/queries/tags/useGetTagsQuery";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Home = () => {
  const { t } = useTranslation();

  const itemsTableColumns = [
    {
      key: 1,
      title: t("common:name"),
      dataIndex: "name",
    },
    {
      key: 2,
      title: t("common:creator"),
      dataIndex: "creator",
      render(creator: IUser) {
        return creator.username;
      },
    },
    {
      key: 3,
      title: t("common:collection"),
      dataIndex: "_collection",
      render(collection: ICollection) {
        return collection.name;
      },
    },
  ];

  const getItemsQuery = useGetLatestItemsQuery();
  const getCollectionsQuery = useGetLargestCollectionsQuery();
  const getTagsQuery = useGetTagsQuery();

  const isLoading =
    getItemsQuery.isLoading ||
    getCollectionsQuery.isLoading ||
    getTagsQuery.isLoading;

  if (isLoading) {
    return (
      <div className="text-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="">
      <Typography.Title className="text-[white]" level={1}>
        {t("titles:latest-items")}
      </Typography.Title>

      <Table dataSource={getItemsQuery.allItems} columns={itemsTableColumns} />

      <Typography.Title level={1}>
        {t("titles:largest-collections")}
      </Typography.Title>

      <Collections
        isInfinite={false}
        collections={getCollectionsQuery.allCollections}
      />

      <Typography.Title className="mt-[15px]" level={1}>
        {t("titles:tag-cloud")}
      </Typography.Title>

      <div className="mt-[10px]">
        {getTagsQuery.allTags.map((tag) => (
          <NextLink href={{ pathname: "/search", query: { tag: tag.label } }}>
            <Tag className="cursor-pointer">{tag.label}</Tag>
          </NextLink>
        ))}
      </div>
    </div>
  );
};

export default Home;
