import { Input } from "antd";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const SearchInput = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const handleSearch = (search: string) => {
    router.push({
      pathname: "/search",
      query: {
        search,
      },
    });
  };

  return (
    <Input.Search
      onSearch={handleSearch}
      className="w-[200px]"
      placeholder={t("placeholders:search")}
    />
  );
};

export default SearchInput;
