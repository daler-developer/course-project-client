import { IItem } from "../types";
import apiClient from "../utils/apiClient";

export const createItem = async ({
  fields,
  collectionId,
}: {
  fields: IItem["fields"];
  collectionId: string;
}) => {
  return await apiClient.post<{ item: IItem }>(
    `/api/collections/${collectionId}/items`,
    {
      fields,
    }
  );
};
