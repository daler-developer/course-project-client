import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  AxiosErrorResponseType,
  CreateCollectionDto,
  ICollection,
  IItem,
  IUser,
} from "../../../types";
import * as itemsApi from "../../../api/items";
import useGetMeQuery from "../../queries/users/useGetMeQuery";
import useCurrentUser from "../../common/useCurrentUser";

export default ({ itemId }: { itemId: string }) => {
  const queryClient = useQueryClient();

  const currentUser = useCurrentUser();

  const mutation = useMutation<void, AxiosErrorResponseType>(
    async () => {
      await itemsApi.unlikeItem({ itemId });
    },
    {
      onSuccess() {
        queryClient.setQueriesData(
          ["items", "detail", itemId],
          (oldItem?: IItem) => {
            if (oldItem) {
              return {
                ...oldItem,
                likes_ids: oldItem.likes_ids.filter(
                  (_id) => _id !== currentUser!._id
                ),
              };
            }
          }
        );
      },
    }
  );

  return mutation;
};
