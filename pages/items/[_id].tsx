import { DeleteOutlined, HeartFilled } from "@ant-design/icons";
import { Button, List, Spin, Typography } from "antd";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Comments from "../../components/common/comments/Comments";
import CreateCommentForm from "../../components/item-detail/CreateCommentForm";
import useCurrentUser from "../../hooks/common/useCurrentUser";
import useIsAuthenticated from "../../hooks/common/useIsAuthenticated";
import useDeleteItemMutation from "../../hooks/mutations/items/useDeleteItemMutation";
import useLikeItemMutation from "../../hooks/mutations/items/useLikeItemMutation";
import useUnlikeItemMutation from "../../hooks/mutations/items/useUnlikeItemMutation";
import useGetComments from "../../hooks/queries/comments/useGetComments";
import useGetItemQuery from "../../hooks/queries/items/useGetItemQuery";

const ItemDetail = () => {
  const router = useRouter();

  const itemId = router.query._id as string;

  const getItemQuery = useGetItemQuery({ itemId });
  const getCommentsQuery = useGetComments({ itemId });

  const likeItemMutation = useLikeItemMutation({ itemId });
  const unlikeItemMutation = useUnlikeItemMutation({ itemId });
  const deleteItemMutation = useDeleteItemMutation({ itemId });

  const isAuthenticated = useIsAuthenticated();

  const currentUser = useCurrentUser();

  const handleDelete = () => deleteItemMutation.mutate();
  const handleLike = () => {
    likeItemMutation.mutate();
  };
  const handleUnlike = () => {
    unlikeItemMutation.mutate();
  };

  const canDeleteItem = useMemo(() => {
    if (
      getItemQuery.data &&
      isAuthenticated &&
      (currentUser!.isAdmin || getItemQuery.data.creatorId === currentUser!._id)
    ) {
      return true;
    }

    return false;
  }, [getItemQuery.data, isAuthenticated, currentUser]);

  const canLikeItem = useMemo(() => {
    if (
      isAuthenticated &&
      getItemQuery.data &&
      !getItemQuery.data.likes_ids.includes(currentUser!._id)
    ) {
      return true;
    }

    return false;
  }, [isAuthenticated, currentUser, getItemQuery.data]);

  const canUnlikeItem = useMemo(() => {
    if (
      isAuthenticated &&
      getItemQuery.data &&
      getItemQuery.data.likes_ids.includes(currentUser!._id)
    ) {
      return true;
    }

    return false;
  }, [isAuthenticated, currentUser, getItemQuery.data]);

  if (getItemQuery.isFetching) {
    return (
      <div className="text-center">
        <Spin />
      </div>
    );
  }

  if (getItemQuery.data) {
    return (
      <div className="">
        <Typography.Title level={1} className="text-center">
          Item info
        </Typography.Title>

        <div className="mt-[20px] flex items-center gap-[5px]">
          <>
            {canLikeItem && (
              <Button
                loading={likeItemMutation.isLoading}
                onClick={handleLike}
                icon={<HeartFilled />}
              >
                Like
              </Button>
            )}
            {canUnlikeItem && (
              <Button
                loading={unlikeItemMutation.isLoading}
                onClick={handleUnlike}
                danger
                icon={<HeartFilled />}
              >
                Unlike
              </Button>
            )}
            {canDeleteItem && (
              <Button
                loading={deleteItemMutation.isLoading}
                onClick={handleDelete}
                danger
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
            )}
          </>
        </div>

        {getItemQuery.data.fields.text && (
          <>
            <Typography.Title level={2} className="mt-[20px]">
              Text fields
            </Typography.Title>
            <List
              itemLayout="horizontal"
              dataSource={Object.entries(getItemQuery.data.fields.text)}
              renderItem={(entry) => (
                <List.Item>
                  <List.Item.Meta title={entry[0]} description={entry[1]} />
                </List.Item>
              )}
            />
          </>
        )}

        {getItemQuery.data.fields.multiLineText && (
          <>
            <Typography.Title level={2} className="mt-[10px]">
              Multi line text
            </Typography.Title>
            <List
              itemLayout="horizontal"
              dataSource={Object.entries(
                getItemQuery.data.fields.multiLineText
              )}
              renderItem={(entry) => (
                <List.Item>
                  <List.Item.Meta title={entry[0]} description={entry[1]} />
                </List.Item>
              )}
            />
          </>
        )}

        {getItemQuery.data.fields.boolean && (
          <>
            <Typography.Title level={2} className="mt-[10px]">
              Boolean fields
            </Typography.Title>
            <List
              itemLayout="horizontal"
              dataSource={Object.entries(getItemQuery.data.fields.boolean)}
              renderItem={(entry) => (
                <List.Item>
                  <List.Item.Meta
                    title={entry[0]}
                    description={entry[1] ? "Yes" : "No"}
                  />
                </List.Item>
              )}
            />
          </>
        )}

        {getItemQuery.data.fields.integer && (
          <>
            <Typography.Title level={2} className="mt-[10px]">
              Integer fields
            </Typography.Title>
            <List
              itemLayout="horizontal"
              dataSource={Object.entries(getItemQuery.data.fields.integer)}
              renderItem={(entry) => (
                <List.Item>
                  <List.Item.Meta title={entry[0]} description={entry[1]} />
                </List.Item>
              )}
            />
          </>
        )}

        {getItemQuery.data.fields.date && (
          <>
            <Typography.Title level={2} className="mt-[10px]">
              Date fields
            </Typography.Title>
            <List
              itemLayout="horizontal"
              dataSource={Object.entries(getItemQuery.data.fields.date)}
              renderItem={(entry) => (
                <List.Item>
                  <List.Item.Meta title={entry[0]} description={entry[1]} />
                </List.Item>
              )}
            />
          </>
        )}

        <div className="mt-[10px]">
          <CreateCommentForm itemId={itemId} />
        </div>

        <div className="mt-[10px]">
          <Comments
            comments={getCommentsQuery.allComments}
            isFetching={getCommentsQuery.isFetching}
            onFetchNextPage={() => getCommentsQuery.fetchNextPage()}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default ItemDetail;
