import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  AxiosErrorResponseType,
  ICollection,
  IUser,
} from "../../../types/index";
import * as collectionsApi from "../../../api/collections";

export type DataType = ICollection;

export default ({ collectionId }: { collectionId: string }) => {
  return useQuery<DataType, AxiosErrorResponseType>(
    ["collections", "detail", collectionId],
    async () => {
      const { data } = await collectionsApi.getCollection({ collectionId });

      return data.collection;
    }
  );
};
