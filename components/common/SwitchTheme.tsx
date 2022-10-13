import { Select } from "antd";
import { useTranslation } from "react-i18next";
import useCurrentUser from "../../hooks/common/useCurrentUser";
import useChangeThemeMutation from "../../hooks/mutations/auth/useChangeThemeMutation";
import { ThemeType } from "../../types";

interface IProps {}

const SwitchTheme = ({}: IProps) => {
  const changeThemeMutation = useChangeThemeMutation();

  const currentUser = useCurrentUser();

  const { t } = useTranslation();

  const handleChangeTheme = (to: ThemeType) => {
    changeThemeMutation.mutate(to);
  };

  return (
    <Select
      className="w-full"
      value={currentUser!.theme}
      onChange={handleChangeTheme}
    >
      <Select.Option value="light">{t("btns:light")}</Select.Option>
      <Select.Option value="dark">{t("btns:dark")}</Select.Option>
    </Select>
  );
};

export default SwitchTheme;
