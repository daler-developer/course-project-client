import { IUser } from "../types/index";
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
