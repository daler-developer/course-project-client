import { useRouter } from "next/router";
import { useEffect } from "react";
import useIsAuthenticated from "./useIsAuthenticated";

export default () => {
  const isAuthenticated = useIsAuthenticated();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated]);
};
