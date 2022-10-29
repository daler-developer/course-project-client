import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosErrorResponseType, IUser } from "../../../types";
import * as usersApi from "../../../api/users";
import useGetMeQuery from "../../queries/users/useGetMeQuery";
import useCurrentUser from "../../common/useCurrentUser";

export default (userId: string) => {
  const queryClient = useQueryClient();

  const currentUser = useCurrentUser();

  const mutation = useMutation<void, AxiosErrorResponseType>(
    async () => {
      await usersApi.blockUser({ userId });
    },
    {
      onSuccess() {
        queryClient.setQueriesData(
          ["users", "list"],
          (oldData?: InfiniteData<IUser[]>) => {
            if (oldData) {
              const newPages = oldData.pages.map((page) =>
                page.map((user) =>
                  user._id === userId
                    ? {
                        ...user,
                        isBlocked: true,
                      }
                    : user
                )
              );

              return {
                pages: newPages,
                pageParams: oldData.pageParams,
              };
            }
          }
        );

        queryClient.setQueryData(["users", "detail"], (oldUser?: IUser) => {
          if (oldUser?._id === userId) {
            return { ...oldUser, isBlocked: true };
          }
        });
      },
    }
  );

  return mutation;
};
