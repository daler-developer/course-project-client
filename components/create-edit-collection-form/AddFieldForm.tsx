import { CloseOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Typography } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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

const LIMIT = 3;

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
    onAddNewField(values.field);
    form.reset();
  });

  const fieldsLimitExceeded = fields.length >= LIMIT;

  return (
    <form onSubmit={handleSubmit}>
      <Typography.Text className="text-[18px]">{title}</Typography.Text>

      <div className="flex flex-col gap-[5px]">
        {fields.map((field) => (
          <div
            key={field}
            className="bg-gray-100 p-[10px] rounded-[5px] font-[500] flex items-center gap-[5px]"
          >
            <div className="flex-grow">
              <span>{field}</span>
            </div>
            <Button
              onClick={() => onRemoveField(field)}
              icon={<CloseOutlined />}
              danger
            />
          </div>
        ))}
      </div>

      {!fieldsLimitExceeded && (
        <>
          <Controller
            name="field"
            control={form.control}
            render={({ field }) => (
              <Input
                style={{ marginTop: "px" }}
                className="w-full block"
                placeholder="New integer field"
                {...(form.formState.errors.field && { status: "error" })}
                {...field}
              />
            )}
          />
          <Button className="mt-[5px]" block htmlType="submit">
            Add
          </Button>
        </>
      )}
    </form>
  );
};

export default AddFieldForm;
