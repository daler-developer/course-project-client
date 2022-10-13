import { Button, Typography } from "antd";
import { useRouter } from "next/router";
import NextLink from "next/link";
import useGetProfileCollectionsQuery from "../hooks/queries/collections/useGetProfileCollectionsQuery";
import Collections from "../components/collections/Collections";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();

  const getCollectionsQuery = useGetProfileCollectionsQuery();

  return (
    <div className="">
      <Typography.Title level={1} className="text-center">
        {t("titles:your-collections")}
      </Typography.Title>

      <div className="mt-[10px] mx-auto max-w-[500px]">
        <NextLink href="/create-collection" passHref>
          <Button block type="primary">
            {t("btns:new")}
          </Button>
        </NextLink>

        <div className="mt-[10px]">
          <Collections
            collections={getCollectionsQuery.allCollections}
            isFetching={getCollectionsQuery.isFetching}
            onFetchNextPage={() => getCollectionsQuery.fetchNextPage()}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
