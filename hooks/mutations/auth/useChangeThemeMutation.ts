import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AxiosErrorResponseType, IUser, ThemeType } from "../../../types/index";
import * as authApi from "../../../api/auth";

export default () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ThemeType, AxiosErrorResponseType, ThemeType>(
    async (theme) => {
      await authApi.changeTheme({ to: theme });

      return theme;
    },
    {
      onSuccess(theme) {
        queryClient.setQueryData(["users", "detail", "me"], (user?: IUser) => {
          if (user) {
            return { ...user, theme };
          }
        });
      },
    }
  );

  return mutation;
};
