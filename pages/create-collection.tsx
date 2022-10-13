import CreateCollectionForm from "../components/create-collection-form/CreateCollectionForm";

interface IProps {}

const CreateCollectionPage = ({}: IProps) => {
  return (
    <div className="max-w-[500px] mx-auto">
      <CreateCollectionForm editMode={false} />
    </div>
  );
};

export default CreateCollectionPage;
