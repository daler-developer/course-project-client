import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  AxiosErrorResponseType,
  CreateCollectionDto,
  ICollection,
  IComment,
  IItem,
  IUser,
} from "../../../types";
import * as itemsApi from "../../../api/items";
import useCurrentUser from "../../common/useCurrentUser";

export default ({ itemId }: { itemId: string }) => {
  const queryClient = useQueryClient();

  const currentUser = useCurrentUser();

  const mutation = useMutation<
    IItem,
    AxiosErrorResponseType,
    {
      fields: IItem["fields"];
      name: IItem["name"];
      tags: IItem["tags"];
    }
  >(
    async (param) => {
      const { data } = await itemsApi.editItem({ ...param, itemId });

      return data.item;
    },
    {
      onSuccess(updatedItem) {
        queryClient.setQueriesData(
          ["items", "detail", itemId],
          (oldItem?: IItem) => {
            if (oldItem) {
              return updatedItem;
            }
          }
        );

        queryClient.setQueriesData(
          ["items", "list"],
          (oldData?: InfiniteData<IItem[]>) => {
            if (oldData) {
              const newPages = oldData.pages.map((page) =>
                page.map((item) => {
                  if (item._id === updatedItem._id) {
                    return updatedItem;
                  } else {
                    return item;
                  }
                })
              );

              return {
                pages: newPages,
                pageParams: oldData.pageParams,
              };
            }
          }
        );
      },
    }
  );

  return mutation;
};
