import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Tag,
  Typography,
} from "antd";
import { ICollection } from "../../types";
import { useForm, Controller, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateItemMutation from "../../hooks/mutations/items/useCreateItemMutation";
import { ChangeEvent, useEffect, useState } from "react";
import TagInput from "../create-item-form/TagInput";

interface IProps {
  isVisible: boolean;
  collection: ICollection;
  onClose: () => void;
}

interface IFormValues {
  name: string;
  tags: string[];
  fields: {
    integer: { [key: string]: number };
    date: { [key: string]: string };
    text: { [key: string]: string };
    multiLineText: { [key: string]: string };
    boolean: { [key: string]: boolean };
  };
}

const CreateItemModal = ({ isVisible, collection, onClose }: IProps) => {
  const createItemMutation = useCreateItemMutation();

  const getIntegerSchema = () => {
    const schema: any = {};

    for (let el of collection.fields.integer) {
      schema[el] = yup.number().required();
    }

    return yup.object(schema);
  };

  const getBooleanSchema = () => {
    const schema: any = {};

    for (let el of collection.fields.boolean) {
      schema[el] = yup.boolean().default(false);
    }

    return yup.object(schema);
  };

  const getTextSchema = () => {
    const schema: any = {};

    for (let el of collection.fields.text) {
      schema[el] = yup.string().trim().required();
    }

    return yup.object(schema);
  };

  const getMultiLineTextSchema = () => {
    const schema: any = {};

    for (let el of collection.fields.multiLineText) {
      schema[el] = yup.string().trim().required();
    }

    return yup.object(schema);
  };

  const getDateSchema = () => {
    const schema: any = {};

    for (let el of collection.fields.date) {
      schema[el] = yup.string().required();
    }

    return yup.object(schema);
  };

  const form = useForm<IFormValues>({
    resolver: yupResolver(
      yup.object({
        name: yup.string().required().min(1).max(20),
        tags: yup.array().of(yup.string().required()).required().default([]),
        fields: yup.object({
          integer: getIntegerSchema(),
          boolean: getBooleanSchema(),
          text: getTextSchema(),
          multiLineText: getMultiLineTextSchema(),
          date: getDateSchema(),
        }),
      })
    ),
    defaultValues: {
      tags: [],
    },
  });

  useWatch({ control: form.control, name: "tags" });

  useEffect(() => {
    initAdditionalFormFields();
  }, []);

  const initAdditionalFormFields = () => {
    form.register("tags");
  };

  const handleSubmit = form.handleSubmit((values) => {
    console.log(values);
    // createItemMutation.mutate(
    //   {
    //     collectionId: collection._id,
    //     fields: values.fields,
    //     name: values.name,
    //     tags: values.tags,
    //   },
    //   {
    //     onSettled() {
    //       form.reset();
    //     },
    //   }
    // );
  });

  const isTagSelected = (tag: string) => {
    return form.getValues("tags").includes(tag);
  };

  const handleAddNewTag = (newTag: string) => {
    if (!isTagSelected(newTag)) {
      form.setValue("tags", [...form.getValues("tags"), newTag]);
    }
  };

  const hasTextFields = !!collection.fields.text.length;
  const hasBooleanFields = !!collection.fields.boolean.length;
  const hasDateFields = !!collection.fields.date.length;
  const hasIntegerFields = !!collection.fields.integer.length;
  const hasMultiLineTextFields = !!collection.fields.multiLineText.length;

  return (
    <Modal
      title="Create item"
      open={isVisible}
      onCancel={() => onClose()}
      footer={[
        <Button
          key="submitBtn"
          htmlType="submit"
          loading={createItemMutation.isLoading}
          onClick={handleSubmit}
        >
          Create
        </Button>,
        <Button key="cancel-btn" htmlType="button" onClick={() => onClose()}>
          Cancel
        </Button>,
      ]}
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field }) => (
          <Input
            placeholder="Name"
            className="mt-[5px]"
            {...(form.formState.errors.name && {
              status: "error",
            })}
            {...field}
          />
        )}
      />

      <div className="mt-[5px]">
        <TagInput onAddTag={handleAddNewTag} />
      </div>

      {!!form.getValues("tags").length && (
        <div className="mt-[10px]">
          {form.getValues("tags").map((tag) => (
            <Tag>{tag}</Tag>
          ))}
        </div>
      )}

      {hasTextFields && (
        <>
          <Typography.Text className="block mt-[15px] font-[500] text-[18px]">
            Text fields
          </Typography.Text>
          {collection.fields.text.map((fieldName) => (
            <>
              <Typography.Text>{fieldName}</Typography.Text>
              <Controller
                name={`fields.text.${fieldName}`}
                control={form.control}
                render={({ field }) => (
                  <Input
                    className="mt-[5px]"
                    {...(form.formState.errors.fields?.text &&
                      form.formState.errors.fields.text[fieldName] && {
                        status: "error",
                      })}
                    {...field}
                  />
                )}
              />
            </>
          ))}
        </>
      )}

      {hasBooleanFields && (
        <>
          <Typography.Text className="block mt-[15px] font-[500] text-[18px]">
            Boolean fields
          </Typography.Text>
          {collection.fields.boolean.map((fieldName) => (
            <>
              <div className="flex items-center gap-[5px]">
                <Controller
                  name={`fields.boolean.${fieldName}`}
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox className="mt-[5px]" {...field} />
                  )}
                />
                <Typography.Text>{fieldName}</Typography.Text>
              </div>
            </>
          ))}
        </>
      )}

      {hasIntegerFields && (
        <>
          <Typography.Text className="block mt-[15px] font-[500] text-[18px]">
            Integer fields
          </Typography.Text>
          {collection.fields.integer.map((fieldName) => (
            <>
              <div className="">
                <Typography.Text>{fieldName}</Typography.Text>
                <Controller
                  name={`fields.integer.${fieldName}`}
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      className="mt-[5px]"
                      {...(form.formState.errors.fields?.integer &&
                        form.formState.errors.fields.integer[fieldName] && {
                          status: "error",
                        })}
                      {...field}
                    />
                  )}
                />
              </div>
            </>
          ))}
        </>
      )}

      {hasMultiLineTextFields && (
        <>
          <Typography.Text className="block mt-[15px] font-[500] text-[18px]">
            Multi line text fields
          </Typography.Text>
          {collection.fields.multiLineText.map((fieldName) => (
            <>
              <div className="">
                <Typography.Text>{fieldName}</Typography.Text>
                <Controller
                  name={`fields.multiLineText.${fieldName}`}
                  control={form.control}
                  render={({ field }) => (
                    <Input.TextArea
                      className="mt-[5px]"
                      {...(form.formState.errors.fields?.multiLineText &&
                        form.formState.errors.fields.multiLineText[
                          fieldName
                        ] && {
                          status: "error",
                        })}
                      {...field}
                    />
                  )}
                />
              </div>
            </>
          ))}
        </>
      )}

      {hasDateFields && (
        <>
          <Typography.Text className="block mt-[15px] font-[500] text-[18px]">
            Date fields
          </Typography.Text>
          {collection.fields.date.map((fieldName) => (
            <>
              <div className="">
                <Typography.Text className="block">{fieldName}</Typography.Text>
                {form.formState.errors.fields?.date &&
                  form.formState.errors.fields.date[fieldName] && (
                    <Typography.Text type="danger">
                      {form.formState.errors.fields.date[fieldName]!.message}
                    </Typography.Text>
                  )}
                <DatePicker
                  className="w-full mt-[5px]"
                  onChange={(date) => {
                    if (date) {
                      form.setValue(
                        `fields.date.${fieldName}`,
                        date.toString()
                      );
                    } else {
                      form.resetField(`fields.date.${fieldName}`);
                    }
                  }}
                />
              </div>
            </>
          ))}
        </>
      )}
    </Modal>
  );
};

export default CreateItemModal;
