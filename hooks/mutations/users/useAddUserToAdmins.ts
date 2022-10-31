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

  const mutation = useMutation<void, AxiosErrorResponseType>(
    async () => {
      await usersApi.addUserToAdmins({ userId });
    },
    {
      onSuccess() {
        const updateUsersInCache = () => {
          queryClient.setQueriesData(
            ["users", "list"],
            (oldData?: InfiniteData<IUser[]>) => {
              if (oldData) {
                const newPages = oldData.pages.map((page) =>
                  page.map((user) =>
                    user._id === userId
                      ? {
                          ...user,
                          isAdmin: true,
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

          queryClient.setQueriesData(["users", "detail"], (oldData?: IUser) => {
            if (oldData && oldData._id === userId) {
              return { ...oldData, isAdmin: true };
            }
          });
        };

        updateUsersInCache();
      },
    }
  );

  return mutation;
};
