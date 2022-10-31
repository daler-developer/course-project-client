import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosErrorResponseType, IUser } from "../../../types";
import * as usersApi from "../../../api/users";
import useCurrentUser from "../../common/useCurrentUser";
import { useRouter } from "next/router";

export default (userId: string) => {
  const queryClient = useQueryClient();

  const currentUser = useCurrentUser()!;

  const router = useRouter();

  const mutation = useMutation<void, AxiosErrorResponseType>(
    async () => {
      await usersApi.removeUserFromAdmins({ userId });
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
                          isAdmin: false,
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

          queryClient.setQueriesData(["users", "detail"], (oldUser?: IUser) => {
            if (oldUser && oldUser._id === userId) {
              return { ...oldUser, isAdmin: false };
            }
          });
        };

        updateUsersInCache();

        if (currentUser!._id === userId) {
          router.back();
        }
      },
    }
  );

  return mutation;
};
