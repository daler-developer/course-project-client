import NextLink from "next/link";
import { Spin, Table, Typography } from "antd";
import useGetLatestItemsQuery from "../hooks/queries/items/useGetLatestItemsQuery";
import FullScreenLoader from "../components/FullScreenLoader";
import { ICollection, IUser } from "../types";
import useGetLargestCollectionsQuery from "../hooks/queries/collections/useGetLargestCollectionsQuery";
import Collections from "../components/collections/Collections";

const itemsTableColumns = [
  {
    key: 1,
    title: "Name",
    dataIndex: "name",
  },
  {
    key: 2,
    title: "Creator",
    dataIndex: "creator",
    render(creator: IUser) {
      return creator.username;
    },
  },
  {
    key: 3,
    title: "Collection",
    dataIndex: "_collection",
    render(collection: ICollection) {
      return collection.name;
    },
  },
];

const Home = () => {
  const getItemsQuery = useGetLatestItemsQuery();
  const getCollectionsQuery = useGetLargestCollectionsQuery();

  const isLoading = getItemsQuery.isLoading || getCollectionsQuery.isLoading;

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
        Latest items
      </Typography.Title>

      {getItemsQuery.data && (
        <Table
          dataSource={getItemsQuery.allItems}
          columns={itemsTableColumns}
        />
      )}

      <Typography.Title level={1}>Largest collections</Typography.Title>

      <div className="max-w-[400px] mx-auto">
        <Collections
          isInfinite={false}
          collections={getCollectionsQuery.allCollections}
        />
      </div>
    </div>
  );
};

export default Home;
