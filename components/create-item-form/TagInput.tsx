import { AutoComplete, Button, Input, Tag } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import useSearchTagsQuery from "../../hooks/queries/tags/useSearchTagsQuery";

interface IProps {
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  tags: string[];
}

const tagSchema = yup.string().trim().required().min(1).max(20);

const TagInput = ({ onAddTag, onRemoveTag, tags }: IProps) => {
  const [inputValue, setInputValue] = useState("");

  const tagsQuery = useSearchTagsQuery({ search: inputValue });

  const { t } = useTranslation();

  const isTagSelected = (tag: string) => {
    return tags.includes(tag);
  };

  const handleClick = () => {
    try {
      const validatedValue = tagSchema.validateSync(inputValue);

      if (!isTagSelected(validatedValue)) {
        onAddTag(validatedValue);
        setInputValue("");
      }
    } finally {
    }
  };

  const handleClose = (tag: string) => onRemoveTag(tag);

  const options = tagsQuery.allTags.map((tag) => ({ value: tag.label }));

  return (
    <>
      <div className="flex items-center">
        <AutoComplete
          options={options}
          className="flex-grow"
          placeholder="Tag"
          value={inputValue}
          onChange={(v) => setInputValue(v)}
          onFocus={() => tagsQuery.refetch()}
        />
        <Button htmlType="button" onClick={handleClick}>
          {t("btns:add")}
        </Button>
      </div>

      {!!tags.length && (
        <div className="mt-[10px]">
          {tags.map((tag) => (
            <Tag key={tag} closable onClose={() => handleClose(tag)}>
              {tag}
            </Tag>
          ))}
        </div>
      )}
    </>
  );
};

export default TagInput;
