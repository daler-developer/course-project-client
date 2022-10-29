import { useRouter } from "next/router";
import { useEffect } from "react";

const OAuthPage = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router);
  }, []);

  return <div className="">daler</div>;
};

export default OAuthPage;
