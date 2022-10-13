import { Select } from "antd";
import useCurrentUser from "../../hooks/common/useCurrentUser";
import useChangeLangMutation from "../../hooks/mutations/auth/useChangeLangMutation";
import { LangType } from "../../types";

interface IProps {}

const SwitchLang = ({}: IProps) => {
  const changeLangMutation = useChangeLangMutation();

  const currentUser = useCurrentUser();

  const handleChangeLang = (to: LangType) => {
    changeLangMutation.mutate(to);
  };

  return (
    <Select
      className="w-full"
      value={currentUser!.lang}
      onChange={handleChangeLang}
    >
      <Select.Option value="ru">Ru</Select.Option>
      <Select.Option value="en">En</Select.Option>
    </Select>
  );
};

export default SwitchLang;
