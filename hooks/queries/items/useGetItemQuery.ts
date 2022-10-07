import { useQuery, UseQueryOptions, QueryOptions } from "@tanstack/react-query";
import * as itemsApi from "../../../api/items";

export default ({ itemId }: { itemId: string }) => {
  const query = useQuery(
    ["items", "detail", itemId],
    async () => {
      const { data } = await itemsApi.getCollectionItem({ itemId });

      return data.item;
    },
    {}
  );

  return query;
};
