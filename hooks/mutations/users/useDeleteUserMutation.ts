import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosErrorResponseType, IUser } from "../../../types";
import * as usersApi from "../../../api/users";
import useGetMeQuery from "../../queries/users/useGetMeQuery";

export default (userId: string) => {
  const queryClient = useQueryClient();

  const getMeQuery = useGetMeQuery({ enabled: false });

  const mutation = useMutation<void, AxiosErrorResponseType>(
    async () => {
      await usersApi.deleteUser({ userId });
    },
    {
      onSuccess() {
        queryClient.setQueriesData(
          ["users", "list"],
          (oldData?: InfiniteData<IUser[]>) => {
            if (oldData) {
              const newPages = oldData.pages.map((page) =>
                page.filter((user) => user._id !== userId)
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
