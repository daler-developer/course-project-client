import { Button, Spin, Typography } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import CreateItemModal from "../../components/modals/CreateItemModal";
import useGetCollectionQuery from "../../hooks/queries/collections/useGetCollectionQuery";

const CollectionDetail = () => {
  const [isCreateItemModalVisible, setIsCreateItemModalVisible] =
    useState(false);

  const router = useRouter();

  const getCollectionQuery = useGetCollectionQuery({
    collectionId: router.query._id as string,
  });

  return (
    <div className="">
      {getCollectionQuery.isFetching && (
        <div className="text-center">
          <Spin size="large" />
        </div>
      )}
      {getCollectionQuery.isSuccess && (
        <>
          <div className="">
            <div className="mx-auto max-w-[400px]">
              <Typography.Title level={1}>
                {getCollectionQuery.data?.name}
              </Typography.Title>
              <Typography.Paragraph>
                Topic: {getCollectionQuery.data.topic}
              </Typography.Paragraph>
              <ReactMarkdown>{getCollectionQuery.data.desc}</ReactMarkdown>
              <div className="">
                {getCollectionQuery.data.imageUrl && (
                  <img
                    className="w-full aspect-video object-cover object-center"
                    src={getCollectionQuery.data.imageUrl}
                  />
                )}
              </div>
            </div>

            <Button
              htmlType="button"
              type="primary"
              onClick={() => setIsCreateItemModalVisible(true)}
            >
              New Item
            </Button>
          </div>

          <CreateItemModal
            isVisible={isCreateItemModalVisible}
            collection={getCollectionQuery.data}
          />
        </>
      )}
    </div>
  );
};

export default CollectionDetail;
