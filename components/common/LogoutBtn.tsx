import { Button } from "antd";
import { useTranslation } from "react-i18next";

const LogoutBtn = () => {
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/login");
  };

  return (
    <Button onClick={handleLogout} type="primary" danger>
      {t("btns:logout")}
    </Button>
  );
};

export default LogoutBtn;
