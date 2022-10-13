import { Input } from "antd";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const SearchInput = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const handleSearch = (search: string) => {
    router.push(
      "/search",
      {
        query: { search },
      },
      { shallow: true }
    );
  };

  return (
    <Input.Search
      onSearch={handleSearch}
      className="w-[200px]"
      placeholder={t("common:search")}
    />
  );
};

export default SearchInput;
