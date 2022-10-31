import { Spin, Typography } from "antd";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import useSearchItemsQuery from "../hooks/queries/items/useSearchItemsQuery";
import FetchMoreBtn from "../components/common/FetchMoreBtn";

const Search = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const itemsQuery = useSearchItemsQuery({
    ...(router.query.tag && { tag: router.query.tag as string }),
    ...(router.query.search && { search: router.query.search as string }),
  });

  return (
    <div className="">
      <Typography.Title level={1} className="text-center">
        {t("titles:search")}
      </Typography.Title>

      {itemsQuery.allItems.map((item) => (
        <div className="flex justify-between p-[10px] shadow-lg">
          <span>{item.name}</span>
          <NextLink href={`/items/${item._id}`}>View</NextLink>
        </div>
      ))}
      <div className="mt-[10px]">
        {itemsQuery.isFetching ? (
          <div className="text-center">
            <Spin />
          </div>
        ) : (
          <div className="text-center">
            <FetchMoreBtn onClick={() => itemsQuery.fetchNextPage()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
