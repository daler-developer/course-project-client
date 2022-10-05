import { Button, Spin } from "antd";
import useGetAdminUsersQuery from "../../../hooks/queries/users/useGetAdminUsersQuery";
import User from "./User";
import { PlusOutlined as PlusIcon } from "@ant-design/icons";

const Users = () => {
  const usersQuery = useGetAdminUsersQuery();

  return (
    <div>
      {usersQuery.data && (
        <div className="flex flex-col gap-[10px]">
          {usersQuery.allUsers.map((user) => (
            <User user={user} />
          ))}
        </div>
      )}

      {usersQuery.isFetching ? (
        <div className="text-center mt-[20px]">
          <Spin />
        </div>
      ) : (
        <div className="text-center">
          <Button
            onClick={() => usersQuery.fetchNextPage()}
            className="mt-[20px]"
            shape="circle"
            icon={<PlusIcon />}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
