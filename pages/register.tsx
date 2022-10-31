import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Input, Typography } from "antd";
import Container from "../components/Container";
import useRegisterMutation from "../hooks/mutations/auth/useRegisterMutation";
import { useRouter } from "next/router";
import useIsAuthenticated from "../hooks/common/useIsAuthenticated";
import { useEffect } from "react";
import useRedirectIfLoggedIn from "../hooks/common/useRedirectIfLoggedIn";
import { GithubOutlined } from "@ant-design/icons";

interface IFormValues {
  username: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup.string().required().min(3).max(20),
  password: yup.string().required().min(8).max(20),
});

const Register = () => {
  useRedirectIfLoggedIn();

  const form = useForm<IFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const registerMutation = useRegisterMutation();

  const handleSubmit = form.handleSubmit((values) => {
    registerMutation.mutate(values);
  });

  const errorMessage = registerMutation.error?.response!.data.message;

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="max-w-[500px] mx-auto">
        <Typography.Title level={1} className="text-center">
          Register
        </Typography.Title>
        {registerMutation.isError && (
          <Typography.Text type="danger">{errorMessage!}</Typography.Text>
        )}
        <Controller
          name="username"
          control={form.control}
          render={({ field }) => (
            <Input
              className="mt-[10px]"
              placeholder="Username"
              {...(form.formState.errors.username && { status: "error" })}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <Input
              style={{ marginTop: "5px" }}
              placeholder="Password"
              type="password"
              {...(form.formState.errors.password && { status: "error" })}
              {...field}
            />
          )}
        />

        <Button
          htmlType="submit"
          block
          loading={registerMutation.isLoading}
          type="primary"
          className="mt-[30px]"
        >
          Register
        </Button>
        {/* <Button
          block
          loading={registerMutation.isLoading}
          className="mt-[5px]"
          icon={<GithubOutlined />}
          onClick={() =>
            window.open(
              "https://github.com/login/oauth/authorize?client_id=cb3cfd1b84fafe5edd71",
              "_blank"
            )
          }
        >
          GitHub
        </Button> */}
      </form>
    </div>
  );
};

export default Register;
