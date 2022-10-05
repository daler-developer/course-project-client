import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosErrorResponseType, ICollection } from "../../../types";
import * as collectionsApi from "../../../api/collections";

export default ({ collectionId }: { collectionId: string }) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosErrorResponseType>(
    async () => {
      await collectionsApi.deleteCollection({ collectionId });
    },
    {
      onSuccess() {
        queryClient.setQueriesData(
          ["collections", "list"],
          (oldData?: InfiniteData<ICollection[]>) => {
            if (oldData) {
              const newPages = oldData.pages.map((page) =>
                page.filter((collection) => collection._id !== collectionId)
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
};
