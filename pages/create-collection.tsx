import CreateEditCollectionForm from "../components/create-edit-collection-form/CreateEditCollectionForm";

interface IProps {}

const CreateCollectionPage = ({}: IProps) => {
  return (
    <div className="max-w-[500px] mx-auto">
      <CreateEditCollectionForm mode="create" initialValues={null} />
    </div>
  );
};

export default CreateCollectionPage;
