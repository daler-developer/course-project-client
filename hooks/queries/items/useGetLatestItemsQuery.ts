import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  AxiosErrorResponseType,
  ICollection,
  IItem,
  IUser,
} from "../../../types/index";
import * as itemsApi from "../../../api/items";

export default () => {
  const query = useInfiniteQuery<IItem[], AxiosErrorResponseType>(
    ["items", "list", "latest"],
    async () => {
      const { data } = await itemsApi.getLatestItems();

      return data.items;
    },
    {
      getNextPageParam(lastPage, pages) {
        const nextOffset = pages.reduce((acc, page) => acc + page.length, 0);

        return nextOffset;
      },
      refetchOnMount: true,
    }
  );

  return {
    ...query,
    allItems:
      query.data?.pages.reduce((acc, item) => [...acc, ...item], []) || [],
  };
};
