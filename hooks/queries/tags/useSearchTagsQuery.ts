import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  AxiosErrorResponseType,
  ICollection,
  IItem,
  ITag,
  IUser,
} from "../../../types/index";
import * as tagsApi from "../../../api/tags";

export type DataType = ITag[];

export default ({ search }: { search: string }) => {
  const query = useInfiniteQuery<DataType, AxiosErrorResponseType>(
    ["tags", "list", { search }],
    async () => {
      const { data } = await tagsApi.searchTags({
        search,
      });

      return data.tags;
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
    allTags:
      query.data?.pages.reduce((acc, item) => [...acc, ...item], []) || [],
  };
};
