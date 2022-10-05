import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  AxiosErrorResponseType,
  CreateCollectionDto,
  ICollection,
  IUser,
} from "../../../types";
import * as collectionsApi from "../../../api/collections";
import useGetMeQuery from "../../queries/users/useGetMeQuery";

export default () => {
  const mutation = useMutation<
    ICollection,
    AxiosErrorResponseType,
    CreateCollectionDto
  >(async (values) => {
    const { data } = await collectionsApi.createCollections(values);

    return data.collection;
  });

  return mutation;
};
