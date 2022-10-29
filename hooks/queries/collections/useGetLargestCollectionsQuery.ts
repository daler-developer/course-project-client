import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  AxiosErrorResponseType,
  ICollection,
  IUser,
} from "../../../types/index";
import * as collectionsApi from "../../../api/collections";

export type DataType = ICollection[];

export default () => {
  const query = useInfiniteQuery<DataType, AxiosErrorResponseType>(
    ["collections", "list", "largest"],
    async () => {
      const { data } = await collectionsApi.getLargestCollections();

      return data.collections;
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
    allCollections:
      query.data?.pages.reduce((acc, item) => [...acc, ...item], []) || [],
  };
};
