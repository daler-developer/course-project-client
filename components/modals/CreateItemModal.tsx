import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Typography,
} from "antd";
import { ICollection } from "../../types";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateItemMutation from "../../hooks/mutations/items/useCreateItemMutation";

interface IProps {
  isVisible: boolean;
  collection: ICollection;
  onClose: () => void;
}

interface IFormValues {
  integer: { [key: string]: number };
  date: { [key: string]: string };
  text: { [key: string]: string };
  multiLineText: { [key: string]: string };
  boolean: { [key: string]: boolean };
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
        integer: getIntegerSchema(),
        boolean: getBooleanSchema(),
        text: getTextSchema(),
        multiLineText: getMultiLineTextSchema(),
        date: getDateSchema(),
      })
    ),
  });

  const handleSubmit = form.handleSubmit((values) => {
    createItemMutation.mutate({
      collectionId: collection._id,
      fields: values,
    });
  });

  const hasTextFields = !!collection.fields.text.length;
  const hasBooleanFields = !!collection.fields.boolean.length;
  const hasDateFields = !!collection.fields.date.length;
  const hasIntegerFields = !!collection.fields.integer.length;
  const hasMultiLineTextFields = !!collection.fields.multiLineText.length;

  return (
    <Modal
      title="Create item"
      visible={isVisible}
      onCancel={() => onClose()}
      footer={[
        <Button
          key="submitBtn"
          htmlType="submit"
          loading={false}
          onClick={handleSubmit}
        >
          Create
        </Button>,
        <Button key="cancel-btn" htmlType="button" onClick={() => onClose()}>
          Cancel
        </Button>,
      ]}
    >
      {hasTextFields && (
        <>
          <Typography.Text className="block mt-[15px] font-[500] text-[18px]">
            Boolean fields
          </Typography.Text>
          {collection.fields.text.map((fieldName) => (
            <>
              <Typography.Text>{fieldName}</Typography.Text>
              <Controller
                name={`text.${fieldName}`}
                control={form.control}
                render={({ field }) => (
                  <Input
                    className="mt-[5px]"
                    {...(form.formState.errors.text &&
                      form.formState.errors.text[fieldName] && {
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
                  name={`boolean.${fieldName}`}
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
                  name={`integer.${fieldName}`}
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      className="mt-[5px]"
                      {...(form.formState.errors.integer &&
                        form.formState.errors.integer[fieldName] && {
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
                  name={`multiLineText.${fieldName}`}
                  control={form.control}
                  render={({ field }) => (
                    <Input.TextArea
                      className="mt-[5px]"
                      {...(form.formState.errors.multiLineText &&
                        form.formState.errors.multiLineText[fieldName] && {
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
                <DatePicker
                  className="w-full mt-[5px]"
                  onChange={(date) => {
                    if (date) {
                      form.setValue(`date.${fieldName}`, date.toString());
                    } else {
                      form.resetField(`date.${fieldName}`);
                    }
                  }}
                />
              </div>
            </>
          ))}
        </>
      )}

      <div className=""></div>
    </Modal>
  );
};

export default CreateItemModal;
