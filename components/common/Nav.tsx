import { Button, Typography } from "antd";
import cn from "classnames";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import useCurrentUser from "../../hooks/common/useCurrentUser";
import useIsAuthenticated from "../../hooks/common/useIsAuthenticated";

interface IProps {
  direction: "row" | "column";
}

const Nav = ({ direction }: IProps) => {
  const { t } = useTranslation();

  const isAuthenticated = useIsAuthenticated();

  const currentUser = useCurrentUser();

  return (
    <div
      className={cn("flex", {
        "flex-col gap-[5px]": direction === "column",
        "flex-row gap-[15px]": direction === "row",
      })}
    >
      <NextLink href="/" passHref>
        <Typography.Link>{t("links:home")}</Typography.Link>
      </NextLink>
      {isAuthenticated && currentUser!.isAdmin && (
        <NextLink href="/admin" passHref>
          <Typography.Link>{t("links:admin")}</Typography.Link>
        </NextLink>
      )}
      {isAuthenticated && (
        <NextLink href="/profile" passHref>
          <Typography.Link>{t("links:profile")}</Typography.Link>
        </NextLink>
      )}
    </div>
  );
};

export default Nav;
