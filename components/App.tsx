import { useRouter } from "next/router";
import { useEffect } from "react";
import useCurrentUser from "../hooks/common/useCurrentUser";
import useIsAuthenticated from "../hooks/common/useIsAuthenticated";
import { useLang } from "../hooks/common/useLang";
import useGetMeQuery from "../hooks/queries/users/useGetMeQuery";
import FullScreenLoader from "./FullScreenLoader";

const App = ({ children }: { children: any }) => {
  const getMeQuery = useGetMeQuery();

  const isAuthenticated = useIsAuthenticated();
  const lang = useLang();

  const currentUser = useCurrentUser();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (currentUser!.theme === "dark") {
        document.body.classList.add("dark");
      } else if (currentUser!.theme === "light") {
        document.body.classList.remove("dark");
      }
    }
  }, [isAuthenticated, currentUser?.theme]);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(router.asPath, router.asPath, {
        locale: lang,
      });
    }
  }, [isAuthenticated, lang]);

  if (getMeQuery.isFetching) {
    return <FullScreenLoader />;
  }

  return children;
};

export default App;
