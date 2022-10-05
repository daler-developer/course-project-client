import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Input, Typography } from "antd";
import Container from "../components/Container";
import useLoginMutation from "../hooks/mutations/auth/useLoginMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useIsAuthenticated from "../hooks/common/useIsAuthenticated";

interface IFormValues {
  username: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup.string().required().min(3).max(20),
  password: yup.string().required().min(8).max(20),
});

const Login = () => {
  const form = useForm<IFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  const loginMutation = useLoginMutation();

  const handleSubmit = form.handleSubmit((values) => {
    loginMutation.mutate(values);
  });

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="max-w-[500px] mx-auto">
        <Typography.Title level={1} className="text-center">
          Login
        </Typography.Title>
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
              className="mt-[10px]"
              placeholder="Password"
              {...(form.formState.errors.password && { status: "error" })}
              {...field}
            />
          )}
        />

        <Button
          htmlType="submit"
          block
          loading={false}
          type="primary"
          className="mt-[30px]"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
