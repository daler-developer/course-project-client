import { IUser } from "../types";
import apiClient from "../utils/apiClient";

export const getMe = async () => {
  return await apiClient.get<{ user: IUser }>("/api/users/me");
};

export const getAdminUsers = async ({ offset }: { offset: number }) => {
  return await apiClient.get<{ users: IUser[] }>("/api/admin/users", {
    params: { offset },
  });
};

export const blockUser = async ({ userId }: { userId: string }) => {
  return await apiClient.patch<{ blocked: true }>(`/api/users/${userId}/block`);
};

export const unblockUser = async ({ userId }: { userId: string }) => {
  return await apiClient.patch<{ unblocked: true }>(
    `/api/users/${userId}/unblock`
  );
};

export const deleteUser = async ({ userId }: { userId: string }) => {
  return await apiClient.delete<{ deleted: true }>(`/api/users/${userId}`);
};

export const addUserToAdmins = async ({ userId }: { userId: string }) => {
  return await apiClient.patch<{ addedToAdmins: true }>(
    `/api/users/${userId}/add-to-admins`
  );
};

export const removeUserFromAdmins = async ({ userId }: { userId: string }) => {
  return await apiClient.patch<{ removedUserFromAdmins: true }>(
    `/api/users/${userId}/remove-from-admins`
  );
};
