import axios from "axios";
import { useEffect } from "react";
import CreateCollectionForm from "../components/create-collection-form/CreateCollectionForm";

const Edit = () => {
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "http://res.cloudinary.com/dcupjdnqe/image/upload/v1665584710/rhghtnnbhwawlsztccky.jpg",
        {
          responseType: "blob",
        }
      );
    })();
  }, []);

  return (
    <div className="">
      <CreateCollectionForm />
    </div>
  );
};

export default Edit;
