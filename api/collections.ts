import { CreateCollectionDto, ICollection } from "../types";
import apiClient from "../utils/apiClient";

export const createCollections = async ({
  desc,
  fields,
  name,
  topic,
  image,
}: CreateCollectionDto) => {
  const form = new FormData();

  form.append("name", name);
  form.append("topic", topic);
  form.append("desc", desc);
  form.append("fields", JSON.stringify(fields));

  if (image) {
    form.append("image", image);
  }

  return await apiClient.post<{ collection: ICollection }>(
    "/api/collections",
    form
  );
};

export const getProfileCollections = async ({ offset }: { offset: number }) => {
  return await apiClient.get<{ collections: ICollection[] }>(
    "/api/profile/collections",
    {
      params: {
        offset,
      },
    }
  );
};

export const getLargestCollections = async () => {
  return await apiClient.get<{ collections: ICollection[] }>(
    "/api/collections/largest"
  );
};

export const deleteCollection = async ({
  collectionId,
}: {
  collectionId: string;
}) => {
  return await apiClient.delete<{ deleted: true[] }>(
    `/api/collections/${collectionId}`
  );
};

export const getCollection = async ({
  collectionId,
}: {
  collectionId: string;
}) => {
  return await apiClient.get<{ collection: ICollection }>(
    `/api/collections/${collectionId}`
  );
};
