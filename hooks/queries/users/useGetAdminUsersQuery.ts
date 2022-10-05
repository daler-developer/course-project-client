import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosErrorResponseType, IUser } from "../../../types/index";
import * as usersApi from "../../../api/users";

export type DataType = IUser[];

export default () => {
  const query = useInfiniteQuery<DataType, AxiosErrorResponseType>(
    ["users", "list", "admin"],
    async ({ pageParam }) => {
      const { data } = await usersApi.getAdminUsers({
        offset: pageParam || 0,
      });

      return data.users;
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
    allUsers:
      query.data?.pages.reduce((acc, item) => [...acc, ...item], []) || [],
  };
};
