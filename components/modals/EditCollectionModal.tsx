import { Button, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ICollection } from "../../types";
import CreateEditCollectionForm from "../create-edit-collection-form/CreateEditCollectionForm";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  collection: ICollection;
}

const EditCollectionModal = ({ isOpen, onClose, collection }: IProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [generatedImage, setGeneratedImage] = useState<File | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      if (collection.imageUrl) {
        await generateImage();
      }
      setIsLoading(false);
    })();
  }, [collection.imageUrl]);

  const generateImage = async () => {
    const res = await fetch(collection.imageUrl!);
    const buffer = await res.arrayBuffer();
    const file = new File([buffer], "random.test");

    setGeneratedImage(file);
  };

  return (
    <Modal
      title={t("titles:edit-collection")}
      open={isOpen}
      onCancel={() => onClose()}
      footer={[
        <Button key="cancel-btn" htmlType="button" onClick={() => onClose()}>
          {t("btns:cancel")}
        </Button>,
      ]}
    >
      {isLoading ? (
        <Spin />
      ) : (
        <CreateEditCollectionForm
          collectionId={collection._id}
          mode="edit"
          withTitle={false}
          initialValues={{
            desc: collection.desc,
            fields: collection.fields,
            name: collection.name,
            topic: collection.topic,
            image: generatedImage,
          }}
        />
      )}
    </Modal>
  );
};

export default EditCollectionModal;
