import { Button, Checkbox, Input, InputNumber, Modal, Typography } from "antd";
import { ICollection } from "../../types";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IProps {
  isVisible: boolean;
  collection: ICollection;
}

interface IFormValues {
  integer: object;
  date: object;
  text: object;
  multiLineText: object;
  boolean: object;
}

const schema = yup.object({});

const CreateItemModal = ({ isVisible, collection }: IProps) => {
  const form = useForm<IFormValues>({ resolver: yupResolver(schema) });

  const handleSubmit = form.handleSubmit((values) => {
    console.log(values);
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
      onCancel={() => {}}
      footer={[
        <Button
          key="submitBtn"
          htmlType="submit"
          loading={false}
          onClick={handleSubmit}
        >
          Create
        </Button>,
        <Button key="cancel-btn" htmlType="button" onClick={() => {}}>
          Cancel
        </Button>,
      ]}
    >
      {hasTextFields && (
        <>
          <Typography.Paragraph className="font-[500] text-[18px]">
            Text fields
          </Typography.Paragraph>
          {collection.fields.text.map((fieldName) => (
            <>
              <Typography.Text>{fieldName}</Typography.Text>
              <Controller
                name={`text.${fieldName}`}
                control={form.control}
                render={({ field }) => (
                  <Input
                    className="mt-[5px]"
                    // {...(form.formState.errors.password && { status: "error" })}
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
                    <Checkbox
                      className="mt-[5px]"
                      // {...(form.formState.errors.password && { status: "error" })}
                      {...field}
                    />
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
                      // {...(form.formState.errors.password && { status: "error" })}
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
                      // {...(form.formState.errors.password && { status: "error" })}
                      {...field}
                    />
                  )}
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
