import { IUser, LangType, ThemeType } from "../types/index";
import client from "../utils/apiClient";

export const register = async (dto: { username: string; password: string }) => {
  return await client.post<{
    user: IUser;
    accessToken: string;
  }>("/api/auth/register", dto);
};

export const login = async (dto: { username: string; password: string }) => {
  return await client.post<{
    user: IUser;
    accessToken: string;
  }>("/api/auth/login", dto);
};

export const changeTheme = async ({ to }: { to: ThemeType }) => {
  return await client.patch<{
    changed: true;
  }>("/api/auth/change-theme", { theme: to });
};

export const changeLang = async ({ to }: { to: LangType }) => {
  return await client.patch<{
    changed: true;
  }>("/api/auth/change-lang", { lang: to });
};
