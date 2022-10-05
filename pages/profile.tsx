import { Button, Typography } from "antd";
import { useRouter } from "next/router";
import NextLink from "next/link";
import useGetProfileCollectionsQuery from "../hooks/queries/collections/useGetProfileCollectionsQuery";
import Collections from "../components/collections/Collections";

const Profile = () => {
  const getCollectionsQuery = useGetProfileCollectionsQuery();

  return (
    <div className="">
      <Typography.Title level={1} className="text-center">
        Profile
      </Typography.Title>

      <NextLink href="/create-collection" passHref>
        <Button type="primary">New</Button>
      </NextLink>

      <div className="mt-[10px]">
        <Collections
          collections={getCollectionsQuery.allCollections}
          isFetching={getCollectionsQuery.isFetching}
          onFetchNextPage={() => getCollectionsQuery.fetchNextPage()}
        />
      </div>
    </div>
  );
};

export default Profile;
