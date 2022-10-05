import { Button } from "antd";
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
    <div className="border border-gray-400 border-solid p-[20px] flex items-center justify-between">
      <span className="font-[600] text-[24px]">{user.username}</span>

      <div className="flex gap-[5px]">
        {user.isBlocked ? (
          <Button
            loading={unblockUserMutation.isLoading}
            onClick={handleUnblock}
            type="primary"
          >
            Unblock
          </Button>
        ) : (
          <Button
            loading={blockUserMutation.isLoading}
            onClick={handleBlock}
            type="primary"
            danger
          >
            Block
          </Button>
        )}
        {user.isAdmin ? (
          <Button
            loading={removeUserFromAdminsMutation.isLoading}
            type="primary"
            onClick={handleRemoveFromAdmins}
          >
            Remove from admins
          </Button>
        ) : (
          <Button
            loading={addUserToAdminsMutation.isLoading}
            type="primary"
            onClick={handleAddToAdmins}
          >
            Add to admins
          </Button>
        )}
        <Button onClick={handleDelete} type="primary" danger>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default User;
