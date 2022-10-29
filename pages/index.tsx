import NextLink from "next/link";
import { Empty, Spin, Table, Tag, Typography } from "antd";
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

  const hasTags = Boolean(getTagsQuery.allTags.length);
  const isLoading =
    getItemsQuery.isFetching ||
    getCollectionsQuery.isFetching ||
    getTagsQuery.isFetching;

  if (isLoading) {
    return (
      <div className="text-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="">
      <Typography.Title className="text-[white] text-center" level={1}>
        {t("titles:latest-items")}
      </Typography.Title>

      <Table dataSource={getItemsQuery.allItems} columns={itemsTableColumns} />

      <div className="mt-[30px]">
        <Typography.Title level={1} className="text-center">
          {t("titles:largest-collections")}
        </Typography.Title>

        <Collections
          isInfinite={false}
          collections={getCollectionsQuery.allCollections}
        />
      </div>

      <div className="mt-[30px]">
        <Typography.Title level={1} className="text-center">
          {t("titles:tag-cloud")}
        </Typography.Title>

        <div className="mt-[10px]">
          {hasTags ? (
            getTagsQuery.allTags.map((tag) => (
              <NextLink
                key={tag.label}
                href={{ pathname: "/search", query: { tag: tag.label } }}
              >
                <Tag className="cursor-pointer">{tag.label}</Tag>
              </NextLink>
            ))
          ) : (
            <Empty description={t("common:no-tags")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
