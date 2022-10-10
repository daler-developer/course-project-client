import { Button, Select, Typography } from "antd";
import NextLink from "next/link";
import useCurrentUser from "../hooks/common/useCurrentUser";
import useIsAuthenticated from "../hooks/common/useIsAuthenticated";
import useChangeLangMutation from "../hooks/mutations/auth/useChangeLangMutation";
import useChangeThemeMutation from "../hooks/mutations/auth/useChangeThemeMutation";
import { LangType, ThemeType } from "../types";
import Container from "./Container";

const Header = () => {
  const changeThemeMutation = useChangeThemeMutation();
  const changeLangMutation = useChangeLangMutation();

  const isAuthenticated = useIsAuthenticated();

  const currentUser = useCurrentUser();

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

  return (
    <div className="fixed top-0 left-0 right-0 shadow-md z-50 bg-white">
      <Container>
        <div className="h-[50px] flex items-center justify-between">
          {isAuthenticated ? (
            <Button onClick={handleLogout} type="primary" danger>
              Logout
            </Button>
          ) : (
            <div className="flex items-center">
              <NextLink href="/login">
                <Button type="link">Login</Button>
              </NextLink>
              <NextLink href="/register">
                <Button type="link">Register</Button>
              </NextLink>
            </div>
          )}

          <div className="flex items-center gap-[20px]">
            <NextLink href="/" passHref>
              <Typography.Link>Home</Typography.Link>
            </NextLink>
            {shouldShowAdminLink && (
              <NextLink href="/admin" passHref>
                <Typography.Link>Admin</Typography.Link>
              </NextLink>
            )}
            {isAuthenticated && (
              <>
                <NextLink href="/profile" passHref>
                  <Typography.Link>Profile</Typography.Link>
                </NextLink>
                <Select value={currentUser!.lang} onChange={handleChangeLang}>
                  <Select.Option value="ru">Ru</Select.Option>
                  <Select.Option value="en">En</Select.Option>
                </Select>
                <Select value={currentUser!.theme} onChange={handleChangeTheme}>
                  <Select.Option value="light">Light</Select.Option>
                  <Select.Option value="dark">Dark</Select.Option>
                </Select>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
