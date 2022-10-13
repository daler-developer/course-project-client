import useCurrentUser from "./useCurrentUser";

export const useLang = () => {
  const currentUser = useCurrentUser();

  return currentUser?.lang;
};
