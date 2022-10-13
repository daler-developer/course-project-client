import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import * as yup from "yup";
import { Button, Input, Select, Typography } from "antd";
import { useWatch } from "react-hook-form";
import { ChangeEvent, useEffect, useRef } from "react";
import AddFieldForm from "./AddFieldForm";
import {
  ConsoleSqlOutlined,
  DeleteOutlined as DeleteIcon,
} from "@ant-design/icons";
import useCreateCollectionMutation from "../../hooks/mutations/collections/useCreateCollectionMutation";
import { CreateCollectionDto } from "../../types";

interface IProps {
  initialValues?: CreateCollectionDto;
  editMode?: boolean;
}

const validationSchema = yup.object({
  desc: yup.string().required().min(1).max(150),
  name: yup.string().required().min(1).max(150),
});

const CreateCollectionForm = ({ initialValues, editMode = false }: IProps) => {
  const createCollectionMutation = useCreateCollectionMutation();

  const form = useForm<CreateCollectionDto>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues || {
      desc: "",
      name: "",
      topic: "animals",
      fields: {
        integer: [],
        date: [],
        text: [],
        multiLineText: [],
        boolean: [],
      },
      image: null,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    initAdditionalFormFields();
  }, []);

  const initAdditionalFormFields = () => {
    form.register("topic");
    form.register("fields.integer");
    form.register("fields.date");
    form.register("fields.boolean");
    form.register("fields.text");
    form.register("fields.multiLineText");
    form.register("image");
  };

  useWatch({ name: "desc", control: form.control });
  useWatch({ name: "topic", control: form.control });
  useWatch({ name: "fields", control: form.control });
  useWatch({ name: "image", control: form.control });

  const handleSubmit = form.handleSubmit((values) => {
    // alert("test");
    createCollectionMutation.mutate(values, {
      onSettled() {
        form.reset();
      },
    });
  });

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    form.setValue("image", e.currentTarget.files![0] || null);
  };

  const handleRemoveImage = () => {
    resetImage();
  };

  const resetImage = () => {
    form.resetField("image");
    fileInputRef.current.value = "";
  };

  const formSubmitBtnRef = useRef<HTMLButtonElement>(null!);

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <button type="submit" hidden ref={formSubmitBtnRef}></button>
        <Typography.Title level={1} className="text-center">
          Create collection
        </Typography.Title>
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <Input
              style={{ marginTop: "5px" }}
              placeholder="Name"
              {...(form.formState.errors.name && { status: "error" })}
              {...field}
            />
          )}
        />
        <Select
          className="mt-[5px] w-full"
          defaultValue={form.getValues("topic")}
          onChange={(to) => form.setValue("topic", to)}
        >
          <Select.Option value="animals">Animals</Select.Option>
          <Select.Option value="furniture">Furniture</Select.Option>
          <Select.Option value="books">Books</Select.Option>
        </Select>
        <Controller
          name="desc"
          control={form.control}
          render={({ field }) => (
            <Input.TextArea
              style={{ marginTop: "5px" }}
              placeholder="Description"
              {...(form.formState.errors.desc && { status: "error" })}
              {...field}
            />
          )}
        />
        {form.getValues("image") ? (
          <div className="w-full mt-[5px] relative">
            <img
              className="w-full aspect-video object-cover"
              src={URL.createObjectURL(form.getValues("image")!)}
            />
            <Button
              className="absolute top-[5px] right-[5px]"
              danger
              htmlType="button"
              shape="circle"
              icon={<DeleteIcon />}
              onClick={handleRemoveImage}
            />
          </div>
        ) : (
          <Button
            className="mt-[5px]"
            block
            onClick={() => fileInputRef.current.click()}
            htmlType="button"
          >
            Upload image
          </Button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileInputChange}
          hidden
        />
      </form>
      <Typography.Text className="mt-[20px] block">Preview:</Typography.Text>
      <ReactMarkdown>{form.getValues("desc")}</ReactMarkdown>

      <Typography.Title level={4} className="mt-[10px]">
        Arbitray values
      </Typography.Title>

      <div className="mt-[5px]">
        <AddFieldForm
          title="Integer fields:"
          fields={form.getValues("fields.integer")}
          onAddNewField={(field) =>
            form.setValue("fields.integer", [
              ...form.getValues("fields.integer"),
              field,
            ])
          }
          onRemoveField={(field) => {
            form.setValue(
              `fields.integer`,
              form.getValues("fields.integer").filter((f) => f !== field)
            );
          }}
        />
      </div>

      <div className="mt-[15px]">
        <AddFieldForm
          title="Boolean fields:"
          fields={form.getValues("fields.boolean")}
          onAddNewField={(field) =>
            form.setValue("fields.boolean", [
              ...form.getValues("fields.boolean"),
              field,
            ])
          }
          onRemoveField={(field) => {
            form.setValue(
              `fields.boolean`,
              form.getValues("fields.boolean").filter((f) => f !== field)
            );
          }}
        />
      </div>

      <div className="mt-[15px]">
        <AddFieldForm
          title="Date fields:"
          fields={form.getValues("fields.date")}
          onAddNewField={(field) =>
            form.setValue("fields.date", [
              ...form.getValues("fields.date"),
              field,
            ])
          }
          onRemoveField={(field) => {
            form.setValue(
              `fields.date`,
              form.getValues("fields.date").filter((f) => f !== field)
            );
          }}
        />
      </div>

      <div className="mt-[15px]">
        <AddFieldForm
          title="Text fields:"
          fields={form.getValues("fields.text")}
          onAddNewField={(field) =>
            form.setValue("fields.text", [
              ...form.getValues("fields.text"),
              field,
            ])
          }
          onRemoveField={(field) => {
            form.setValue(
              `fields.text`,
              form.getValues("fields.text").filter((f) => f !== field)
            );
          }}
        />
      </div>

      <div className="mt-[15px]">
        <AddFieldForm
          title="Multi line text fields:"
          fields={form.getValues("fields.multiLineText")}
          onAddNewField={(field) =>
            form.setValue("fields.multiLineText", [
              ...form.getValues("fields.multiLineText"),
              field,
            ])
          }
          onRemoveField={(field) => {
            form.setValue(
              `fields.multiLineText`,
              form.getValues("fields.multiLineText").filter((f) => f !== field)
            );
          }}
        />
      </div>

      <Button
        htmlType="button"
        className="mt-[30px]"
        type="primary"
        block
        loading={createCollectionMutation.isLoading}
        onClick={() => formSubmitBtnRef.current.click()}
      >
        Create
      </Button>
    </div>
  );
};

export default CreateCollectionForm;
