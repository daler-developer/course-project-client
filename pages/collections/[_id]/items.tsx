import { Button, Spin, Typography } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Items from "../../../components/items/Items";
import CreateItemModal from "../../../components/modals/CreateItemModal";
import useGetCollectionQuery from "../../../hooks/queries/collections/useGetCollectionQuery";
import useGetCollectionItemQuery from "../../../hooks/queries/items/useGetCollectionItemQuery";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";

const CollectionDetail = () => {
  const [isCreateItemModalVisible, setIsCreateItemModalVisible] =
    useState(false);

  const router = useRouter();

  const { t } = useTranslation();

  const getCollectionQuery = useGetCollectionQuery({
    collectionId: router.query._id as string,
  });
  const getCollectionItemsQuery = useGetCollectionItemQuery({
    collectionId: router.query._id as string,
  });

  return (
    <div className="">
      {getCollectionQuery.isFetching ? (
        <div className="text-center">
          <Spin />
        </div>
      ) : (
        <>
          <Typography.Title level={1} className="text-center">
            {t("titles:items")}
          </Typography.Title>
          <Button
            block
            onClick={() => setIsCreateItemModalVisible(true)}
            type="primary"
          >
            {t("btns:new")}
          </Button>
          {getCollectionItemsQuery.isSuccess && (
            <div className="mt-[10px]">
              <Items
                collection={getCollectionQuery.data!}
                items={getCollectionItemsQuery.allItems}
                isFetching={getCollectionItemsQuery.isFetching}
                onFetchNextPage={() => getCollectionItemsQuery.fetchNextPage()}
              />
            </div>
          )}

          <CreateItemModal
            isVisible={isCreateItemModalVisible}
            collection={getCollectionQuery.data!}
            onClose={() => setIsCreateItemModalVisible(false)}
          />
        </>
      )}
    </div>
  );
};

export default CollectionDetail;
