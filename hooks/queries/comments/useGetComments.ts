import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  AxiosErrorResponseType,
  ICollection,
  IComment,
  IItem,
  IUser,
} from "../../../types/index";
import * as commentsApi from "../../../api/comments";

export default ({ itemId }: { itemId: string }) => {
  const query = useInfiniteQuery<IComment[], AxiosErrorResponseType>(
    ["comments", "list", { itemId }],
    async ({ pageParam }) => {
      const { data } = await commentsApi.getComments({
        offset: pageParam || 0,
        itemId,
      });

      return data.comments;
    },
    {
      getNextPageParam(lastPage, pages) {
        const nextOffset = pages.reduce((acc, page) => acc + page.length, 0);

        return nextOffset;
      },
    }
  );

  return {
    ...query,
    allComments:
      query.data?.pages.reduce((acc, item) => [...acc, ...item], []) || [],
  };
};
