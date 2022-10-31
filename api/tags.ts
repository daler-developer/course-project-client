import { ITag } from "../types";
import apiClient from "../utils/apiClient";

export const getTags = async () => {
  return await apiClient.get<{ tags: ITag[] }>("/api/common/tags");
};

export const searchTags = async ({ search }: { search: string }) => {
  return await apiClient.get<{ tags: ITag[] }>("/api/tags/search", {
    params: { search },
  });
};
