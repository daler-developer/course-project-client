import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import * as yup from "yup";
import { Button, Input, Select, Typography } from "antd";
import { useWatch } from "react-hook-form";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import AddFieldForm from "./AddFieldForm";
import {
  ConsoleSqlOutlined,
  DeleteOutlined as DeleteIcon,
} from "@ant-design/icons";
import useCreateCollectionMutation from "../../hooks/mutations/collections/useCreateCollectionMutation";
import { CreateCollectionDto } from "../../types";
import axios from "axios";
import { useTranslation } from "react-i18next";
import useEditCollectionMutation from "../../hooks/mutations/collections/useEditCollectionMutation";

interface ICommonProps {
  withTitle?: boolean;
}

interface IEditModeProps extends ICommonProps {
  mode: "edit";
  collectionId: string;
  initialValues: CreateCollectionDto;
}

interface ICreateModeProps extends ICommonProps {
  mode: "create";
  initialValues: null;
  collectionId: null;
}

const validationSchema = yup.object({
  desc: yup.string().trim().required().min(1).max(150),
  name: yup.string().trim().required().min(1).max(150),
});

const CreateEditCollectionForm = ({
  initialValues,
  mode,
  collectionId,
  withTitle = true,
}: IEditModeProps | ICreateModeProps) => {
  const createCollectionMutation = useCreateCollectionMutation();
  const editCollectionMutation = useEditCollectionMutation();

  const { t } = useTranslation();

  const form = useForm<CreateCollectionDto>({
    resolver: yupResolver(validationSchema),
    defaultValues:
      mode === "edit"
        ? initialValues!
        : {
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
    if (mode === "edit") {
      editCollectionMutation.mutate({ ...values, collectionId });
    } else if (mode === "create") {
      createCollectionMutation.mutate(values, {
        onSettled() {
          resetForm();
        },
      });
    }
  });

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    form.setValue("image", e.currentTarget.files![0] || null);
  };

  const handleRemoveImage = () => {
    resetImage();
  };

  const resetForm = () => {
    form.reset();
    fileInputRef.current.value = "";
  };

  const resetImage = () => {
    form.setValue("image", null);
    fileInputRef.current.value = "";
  };

  const formSubmitBtnRef = useRef<HTMLButtonElement>(null!);

  const hasPreview = Boolean(form.getValues("desc").trim());

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit" hidden ref={formSubmitBtnRef}></button>
        {withTitle && (
          <Typography.Title level={1} className="text-center">
            {t("titles:create-collection")}
          </Typography.Title>
        )}
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <Input
              style={{ marginTop: "5px" }}
              placeholder={t("placeholders:name")}
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
              placeholder={t("placeholders:desc")}
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
            {t("btns:upload-img")}
          </Button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileInputChange}
          hidden
        />
      </form>

      {hasPreview && (
        <>
          <Typography.Text className="mt-[20px] block">
            {t("common:preview")}:
          </Typography.Text>
          <ReactMarkdown>{form.getValues("desc")}</ReactMarkdown>
        </>
      )}

      <Typography.Title level={4} className="mt-[10px]">
        {t("common:arbitrary-fields")}
      </Typography.Title>

      <div className="mt-[5px]">
        <AddFieldForm
          title={`${t("titles:integer-fields")}:`}
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
          title={`${t("titles:boolean-fields")}:`}
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
          title={`${t("titles:date-fields")}:`}
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
          title={`${t("titles:text-fields")}:`}
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
          title={`${t("titles:multi-line-text-fields")}:`}
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

      {mode === "create" && (
        <Button
          htmlType="button"
          className="mt-[30px]"
          type="primary"
          block
          loading={createCollectionMutation.isLoading}
          onClick={() => formSubmitBtnRef.current.click()}
        >
          {t("btns:create")}
        </Button>
      )}
      {mode === "edit" && (
        <Button
          htmlType="button"
          className="mt-[30px]"
          type="primary"
          block
          loading={editCollectionMutation.isLoading}
          onClick={() => formSubmitBtnRef.current.click()}
        >
          {t("btns:edit")}
        </Button>
      )}
    </div>
  );
};

export default CreateEditCollectionForm;
