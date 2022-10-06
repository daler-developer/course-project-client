import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  AxiosErrorResponseType,
  ICollection,
  IItem,
  IUser,
} from "../../../types/index";
import * as itemsApi from "../../../api/items";

export type DataType = IItem[];

export default ({ collectionId }: { collectionId: string }) => {
  const query = useInfiniteQuery<DataType, AxiosErrorResponseType>(
    ["items", "list", { collectionId }],
    async ({ pageParam }) => {
      const { data } = await itemsApi.getCollectionItems({
        offset: pageParam || 0,
        collectionId,
      });

      return data.items;
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
    allItems:
      query.data?.pages.reduce((acc, item) => [...acc, ...item], []) || [],
  };
};
