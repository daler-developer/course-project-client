import useGetMeQuery from "../hooks/queries/users/useGetMeQuery";
import FullScreenLoader from "./FullScreenLoader";

const App = ({ children }: { children: any }) => {
  const getMeQuery = useGetMeQuery();

  if (getMeQuery.isFetching) {
    return <FullScreenLoader />;
  }

  return children;
};

export default App;
