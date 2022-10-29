import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import Users from "../components/admin/users/Users";

const Admin = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography.Title className="text-center" level={1}>
        {t("titles:users")}
      </Typography.Title>
      <Users />
    </div>
  );
};

export default Admin;
