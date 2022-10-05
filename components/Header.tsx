import { Button, Typography } from "antd";
import NextLink from "next/link";
import useCurrentUser from "../hooks/common/useCurrentUser";
import Container from "./Container";

const Header = () => {
  const currentUser = useCurrentUser()!;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/login");
  };

  return (
    <div className="fixed top-0 left-0 right-0 shadow-md z-50 bg-white">
      <Container>
        <div className="h-[50px] flex items-center justify-between">
          {currentUser ? (
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
            {currentUser?.isAdmin && (
              <NextLink href="/admin" passHref>
                <Typography.Link>Admin</Typography.Link>
              </NextLink>
            )}
            <NextLink href="/profile" passHref>
              <Typography.Link>Profile</Typography.Link>
            </NextLink>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
