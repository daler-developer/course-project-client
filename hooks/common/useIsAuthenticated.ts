import useCurrentUser from "./useCurrentUser";

export default () => {
  return !!useCurrentUser();
};
