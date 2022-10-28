import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useCurrentUser from "../hooks/common/useCurrentUser";
import useIsAuthenticated from "../hooks/common/useIsAuthenticated";
import { useLang } from "../hooks/common/useLang";
import useGetMeQuery from "../hooks/queries/users/useGetMeQuery";
import FullScreenLoader from "./FullScreenLoader";

const App = ({ children }: { children: any }) => {
  const [isLoading, setIsLoading] = useState(true);

  const getMeQuery = useGetMeQuery({ enabled: false });

  const isAuthenticated = useIsAuthenticated();
  const lang = useLang();

  const currentUser = useCurrentUser();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      await fetchCurrentUserIfTokenExists();
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const switchTheme = () => {
      if (currentUser!.theme === "dark") {
        document.body.classList.add("dark");
      } else if (currentUser!.theme === "light") {
        document.body.classList.remove("dark");
      }
    };

    if (isAuthenticated) {
      switchTheme();
    }
  }, [isAuthenticated, currentUser?.theme]);

  useEffect(() => {
    const switchLang = () => {
      router.replace(router.asPath, router.asPath, {
        locale: lang,
      });
    };

    if (isAuthenticated) {
      switchLang();
    }
  }, [isAuthenticated, lang]);

  const fetchCurrentUserIfTokenExists = async () => {
    const authToken = localStorage.getItem("accessToken");

    if (authToken) {
      await getMeQuery.refetch();
    }
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return children;
};

export default App;
