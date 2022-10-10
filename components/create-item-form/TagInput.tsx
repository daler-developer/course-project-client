import { AutoComplete, Button, Input } from "antd";
import { useState } from "react";
import * as yup from "yup";
import useSearchTagsQuery from "../../hooks/queries/tags/useSearchTagsQuery";

interface IProps {
  onAddTag: (tag: string) => void;
}

const tagSchema = yup.string().trim().required().min(1).max(20);

const TagInput = ({ onAddTag }: IProps) => {
  const [inputValue, setInputValue] = useState("");

  const tagsQuery = useSearchTagsQuery({ search: inputValue });

  const handleClick = () => {
    const validatedValue = tagSchema.validateSync(inputValue);
    onAddTag(validatedValue);
    setInputValue("");
  };

  const options = tagsQuery.allTags;

  return (
    <div className="flex items-center">
      <AutoComplete
        options={options}
        className="flex-grow"
        placeholder="Tag"
        value={inputValue}
        onChange={(v) => setInputValue(v)}
      />
      <Button htmlType="button" onClick={handleClick}>
        Add
      </Button>
    </div>
  );
};

export default TagInput;
