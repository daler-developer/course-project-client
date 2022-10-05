import useGetMeQuery from "../queries/users/useGetMeQuery";

export default () => {
  const getMeQuery = useGetMeQuery({ enabled: false });

  return getMeQuery.data;
};
