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
import * as collectionsApi from "../../../api/collections";
import useCurrentUser from "../../common/useCurrentUser";

export default () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ICollection,
    AxiosErrorResponseType,
    Pick<ICollection, "name" | "desc" | "fields" | "topic"> & {
      image: File | null;
      collectionId: string;
    }
  >(
    async (param) => {
      const { data } = await collectionsApi.editCollection(param);

      return data.collection;
    },
    {
      onSuccess(updatedItem) {
        queryClient.setQueriesData(
          ["collections", "detail", updatedItem._id],
          (oldItem?: ICollection) => {
            if (oldItem) {
              return updatedItem;
            }
          }
        );

        queryClient.setQueriesData(
          ["collections", "list"],
          (oldData?: InfiniteData<ICollection[]>) => {
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
