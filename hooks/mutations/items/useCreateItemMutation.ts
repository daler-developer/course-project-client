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

export default () => {
  const mutation = useMutation<
    IItem,
    AxiosErrorResponseType,
    {
      fields: IItem["fields"];
      collectionId: string;
    }
  >(async (param) => {
    const { data } = await itemsApi.createItem(param);

    return data.item;
  });

  return mutation;
};