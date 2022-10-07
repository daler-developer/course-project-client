import { IComment } from "../types";
import apiClient from "../utils/apiClient";

export const getComments = async ({
  itemId,
  offset,
}: {
  itemId: string;
  offset: number;
}) => {
  return await apiClient.get<{ comments: IComment[] }>(
    `/api/items/${itemId}/comments`,
    {
      params: { offset },
    }
  );
};

export const createComment = async ({
  itemId,
  text,
}: {
  itemId: string;
  text: string;
}) => {
  return await apiClient.post<{ comment: IComment }>(
    `/api/items/${itemId}/comments`,
    {
      text,
    }
  );
};
