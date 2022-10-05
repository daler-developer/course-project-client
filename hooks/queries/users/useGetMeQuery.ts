import { useQuery, UseQueryOptions, QueryOptions } from "@tanstack/react-query";
import * as usersApi from "../../../api/users";

export default ({ enabled = true }: { enabled?: boolean } = {}) => {
  const query = useQuery(
    ["users", "detail", "me"],
    async () => {
      const { data } = await usersApi.getMe();

      return data.user;
    },
    {
      enabled,
    }
  );

  return query;
};
