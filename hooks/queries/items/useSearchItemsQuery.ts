import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  AxiosErrorResponseType,
  ICollection,
  IItem,
  IUser,
} from "../../../types/index";
import * as itemsApi from "../../../api/items";

export default ({ tag, search }: { tag?: string; search?: string }) => {
  const query = useInfiniteQuery<IItem[], AxiosErrorResponseType>(
    ["items", "list", "search"],
    async ({ pageParam }) => {
      const { data } = await itemsApi.searchItems({
        offset: pageParam || 0,
        tag,
        search,
      });

      return data.items;
    },
    {
      getNextPageParam(_, pages) {
        const nextOffset = pages.reduce((acc, page) => acc + page.length, 0);

        return nextOffset;
      },
    }
  );

  return {
    ...query,
    allItems:
      query.data?.pages.reduce((acc, item) => [...acc, ...item], []) || [],
  };
};
