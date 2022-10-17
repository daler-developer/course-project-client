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
import { useRouter } from "next/router";

export default ({ itemId }: { itemId: string }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, AxiosErrorResponseType>(
    async () => {
      await itemsApi.deleteItem({ itemId });
    },
    {
      onSuccess() {
        queryClient.setQueriesData(
          ["items", "list"],
          (oldData?: InfiniteData<ICollection[]>) => {
            if (oldData) {
              const newPages = oldData.pages.map((page) =>
                page.filter((item) => item._id !== itemId)
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
