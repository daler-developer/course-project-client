import { CloseOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Typography } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

interface IProps {
  title: string;
  fields: string[];
  onAddNewField: (field: string) => void;
  onRemoveField: (field: string) => void;
}

interface IFormValues {
  field: string;
}

const validationSchema = yup.object({
  field: yup.string().required().min(1),
});

const AddFieldForm = ({
  fields,
  onAddNewField,
  title,
  onRemoveField,
}: IProps) => {
  const form = useForm<IFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = form.handleSubmit((values) => {
    if (!fields.includes(values.field)) {
      onAddNewField(values.field);
    }
    form.reset();
  });

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
      <Typography.Text className="text-[18px]">{title}</Typography.Text>

      <div className="flex flex-col">
        {fields.map((field) => (
          <div
            key={field}
            className="bg-gray-100 p-[10px] mb-[5px] rounded-[5px] font-[500] flex items-center"
          >
            <div className="flex-grow">
              <span>{field}</span>
            </div>
            <Button
              size="small"
              onClick={() => onRemoveField(field)}
              icon={<CloseOutlined />}
              danger
            />
          </div>
        ))}
      </div>

      <>
        <Controller
          name="field"
          control={form.control}
          render={({ field }) => (
            <Input
              style={{ marginTop: "px" }}
              className="w-full block"
              {...(form.formState.errors.field && { status: "error" })}
              {...field}
            />
          )}
        />
        <Button className="mt-[5px]" block htmlType="submit">
          {t("btns:add")}
        </Button>
      </>
    </form>
  );
};

export default AddFieldForm;
