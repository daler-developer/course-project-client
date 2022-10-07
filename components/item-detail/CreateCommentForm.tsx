import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "antd";
import useCreateCommentMutation from "../../hooks/mutations/comments/useCreateCommentMutation";

interface IProps {
  itemId: string;
}

interface IFormValues {
  text: string;
}

const schema = yup.object({
  text: yup.string().required().min(1).max(100),
});

const CreateCommentForm = ({ itemId }: IProps) => {
  const createCommentMutation = useCreateCommentMutation({ itemId });

  const form = useForm<IFormValues>({ resolver: yupResolver(schema) });

  const handleSubmit = form.handleSubmit((values) => {
    createCommentMutation.mutate(
      { itemId, text: values.text },
      {
        onSettled() {
          form.reset();
        },
      }
    );
  });

  return (
    <form onSubmit={handleSubmit} className="flex">
      <Controller
        name="text"
        control={form.control}
        render={({ field }) => (
          <Input
            className="flex-grow"
            placeholder="Comment"
            {...(form.formState.errors.text && { status: "error" })}
            {...field}
          />
        )}
      />
      <Button loading={createCommentMutation.isLoading} htmlType="submit">
        Create
      </Button>
    </form>
  );
};

export default CreateCommentForm;
