import { Button } from "antd";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";

interface IProps {}

const AuthNav = ({}: IProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex gap-[2px] items-center">
      <NextLink href="/login">
        <Button type="link">{t("links:login")}</Button>
      </NextLink>
      <NextLink href="/register">
        <Button type="link">{t("links:register")}</Button>
      </NextLink>
    </div>
  );
};

export default AuthNav;
