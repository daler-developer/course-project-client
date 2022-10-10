import { IItem } from "../types";
import apiClient from "../utils/apiClient";

export const createItem = async ({
  fields,
  collectionId,
  name,
  tags,
}: {
  collectionId: string;
  fields: IItem["fields"];
  name: IItem["name"];
  tags: IItem["tags"];
}) => {
  return await apiClient.post<{ item: IItem }>(
    `/api/collections/${collectionId}/items`,
    {
      fields,
      name,
      tags,
    }
  );
};

export const getCollectionItems = async ({
  offset,
  collectionId,
}: {
  offset: number;
  collectionId: string;
}) => {
  return await apiClient.get<{ items: IItem[] }>(
    `/api/collections/${collectionId}/items`,
    {
      params: { offset },
    }
  );
};

export const getLatestItems = async () => {
  return await apiClient.get<{ items: IItem[] }>(`/api/items/latest`);
};

export const getCollectionItem = async ({ itemId }: { itemId: string }) => {
  return await apiClient.get<{ item: IItem }>(`/api/items/${itemId}`);
};

export const likeItem = async ({ itemId }: { itemId: string }) => {
  return await apiClient.patch<{ items: IItem[] }>(`/api/items/${itemId}/like`);
};

export const deleteItem = async ({ itemId }: { itemId: string }) => {
  return await apiClient.delete<{ items: IItem[] }>(`/api/items/${itemId}`);
};

export const unlikeItem = async ({ itemId }: { itemId: string }) => {
  return await apiClient.patch<{ items: IItem[] }>(
    `/api/items/${itemId}/unlike`
  );
};
