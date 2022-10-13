import { Button, Input, Select, Typography } from "antd";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import useCurrentUser from "../hooks/common/useCurrentUser";
import useIsAuthenticated from "../hooks/common/useIsAuthenticated";
import useChangeLangMutation from "../hooks/mutations/auth/useChangeLangMutation";
import useChangeThemeMutation from "../hooks/mutations/auth/useChangeThemeMutation";
import { LangType, ThemeType } from "../types";
import Nav from "./common/Nav";
import SwitchLang from "./common/SwitchLang";
import Container from "./Container";
import SwitchTheme from "./common/SwitchTheme";
import LogoutBtn from "./common/LogoutBtn";
import SearchInput from "./common/SearchInput";
import AuthNav from "./common/AuthNav";

const Header = () => {
  const changeThemeMutation = useChangeThemeMutation();
  const changeLangMutation = useChangeLangMutation();

  const { t } = useTranslation();

  const isAuthenticated = useIsAuthenticated();

  const currentUser = useCurrentUser();

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/login");
  };

  const shouldShowAdminLink = isAuthenticated && currentUser!.isAdmin;

  const handleChangeTheme = (to: ThemeType) => {
    changeThemeMutation.mutate(to);
  };

  const handleChangeLang = (to: LangType) => {
    changeLangMutation.mutate(to);
  };

  const handleSearch = (search: string) => {
    router.push(
      "/search",
      {
        query: { search },
      },
      { shallow: true }
    );
  };

  return (
    <div className="fixed top-0 left-0 right-0 shadow-md z-50 bg-white dark:bg-black">
      <Container>
        <div className="h-[50px] flex items-center justify-between">
          <div className="flex gap-[5px]">
            {isAuthenticated ? <LogoutBtn /> : <AuthNav />}
            <SearchInput />
          </div>

          <div className="flex items-center gap-[20px]">
            <Nav direction="row" />
            {isAuthenticated && (
              <>
                <SwitchLang />
                <SwitchTheme />
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
