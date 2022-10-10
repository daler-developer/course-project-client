import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  AxiosErrorResponseType,
  IUser,
  LangType,
  ThemeType,
} from "../../../types/index";
import * as authApi from "../../../api/auth";

export default () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<LangType, AxiosErrorResponseType, LangType>(
    async (lang) => {
      await authApi.changeLang({ to: lang });

      return lang;
    },
    {
      onSuccess(lang) {
        queryClient.setQueryData(["users", "detail", "me"], (user?: IUser) => {
          if (user) {
            return { ...user, lang };
          }
        });
      },
    }
  );

  return mutation;
};
