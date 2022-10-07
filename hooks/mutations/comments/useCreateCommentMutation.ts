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
  IUser,
} from "../../../types";
import * as commentsApi from "../../../api/comments";

interface IParams {
  text: string;
}

export default ({ itemId }: { itemId: string }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IComment, AxiosErrorResponseType, IParams>(
    async ({ text }) => {
      const { data } = await commentsApi.createComment({ text, itemId });

      return data.comment;
    },
    {
      onSuccess(comment) {
        queryClient.setQueryData(
          ["comments", "list", { itemId }],
          (oldData?: InfiniteData<IComment[]>) => {
            if (oldData) {
              const newPages = [[comment], ...oldData.pages];
              const newPageParams = [undefined, ...oldData.pageParams];

              return {
                pages: newPages,
                pageParams: newPageParams,
              };
            }
          }
        );
      },
    }
  );

  return mutation;
};
