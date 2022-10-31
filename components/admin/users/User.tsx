import { Button } from "antd";
import { useTranslation } from "react-i18next";
import useAddUserToAdmins from "../../../hooks/mutations/users/useAddUserToAdmins";
import useBlockUserMutation from "../../../hooks/mutations/users/useBlockUserMutation";
import useDeleteUserMutation from "../../../hooks/mutations/users/useDeleteUserMutation";
import useRemoveUserFromAdmins from "../../../hooks/mutations/users/useRemoveUserFromAdmins";
import useUnblockUserMutation from "../../../hooks/mutations/users/useUnblockUserMutation";
import { IUser } from "../../../types";

interface IProps {
  user: IUser;
}

const User = ({ user }: IProps) => {
  const { t } = useTranslation();

  const blockUserMutation = useBlockUserMutation(user._id);
  const unblockUserMutation = useUnblockUserMutation(user._id);
  const deleteUserMutation = useDeleteUserMutation(user._id);
  const addUserToAdminsMutation = useAddUserToAdmins(user._id);
  const removeUserFromAdminsMutation = useRemoveUserFromAdmins(user._id);

  const handleBlock = () => blockUserMutation.mutate();
  const handleUnblock = () => unblockUserMutation.mutate();
  const handleRemoveFromAdmins = () => removeUserFromAdminsMutation.mutate();
  const handleAddToAdmins = () => addUserToAdminsMutation.mutate();
  const handleDelete = () => deleteUserMutation.mutate();

  return (
    <div className="border border-gray-400 border-solid p-[20px] flex items-center justify-between bg-white">
      <span className="font-[600] text-[24px]">{user.username}</span>

      <div className="flex gap-[5px]">
        {user.isBlocked ? (
          <Button
            loading={unblockUserMutation.isLoading}
            onClick={handleUnblock}
            type="primary"
          >
            {t("btns:unblock")}
          </Button>
        ) : (
          <Button
            loading={blockUserMutation.isLoading}
            onClick={handleBlock}
            type="primary"
            danger
          >
            {t("btns:block")}
          </Button>
        )}
        {user.isAdmin ? (
          <Button
            loading={removeUserFromAdminsMutation.isLoading}
            type="primary"
            onClick={handleRemoveFromAdmins}
          >
            {t("btns:remove-from-admins")}
          </Button>
        ) : (
          <Button
            loading={addUserToAdminsMutation.isLoading}
            type="primary"
            onClick={handleAddToAdmins}
          >
            {t("btns:add-to-admins")}
          </Button>
        )}
        <Button onClick={handleDelete} type="primary" danger>
          {t("btns:delete")}
        </Button>
      </div>
    </div>
  );
};

export default User;
