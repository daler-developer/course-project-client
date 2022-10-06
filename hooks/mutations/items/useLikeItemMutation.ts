import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  AxiosErrorResponseType,
  CreateCollectionDto,
  ICollection,
  IItem,
  IUser,
} from "../../../types";
import * as itemsApi from "../../../api/items";
import useGetMeQuery from "../../queries/users/useGetMeQuery";

export default ({ itemId }: { itemId: string }) => {
  const mutation = useMutation<void, AxiosErrorResponseType>(async () => {
    await itemsApi.likeItem({ itemId });
  });

  return mutation;
};
