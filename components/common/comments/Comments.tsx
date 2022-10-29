import { Empty, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { IComment } from "../../../types";
import FetchMoreBtn from "../FetchMoreBtn";
import Comment from "./Comment";

interface IProps {
  comments: IComment[];
  isFetching: boolean;
  onFetchNextPage: Function;
}
const Comments = ({ comments, isFetching, onFetchNextPage }: IProps) => {
  const { t } = useTranslation();

  const hasData = Boolean(comments.length);

  return (
    <div className="">
      <div className="flex flex-col gap-[5px]">
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>

      {!hasData && <Empty description={t("common:no-comments")} />}

      {isFetching ? (
        <div className="text-center mt-[20px]">
          <Spin />
        </div>
      ) : (
        <div className="text-center">
          <FetchMoreBtn
            onClick={() => onFetchNextPage()}
            className="mt-[20px]"
          />
        </div>
      )}
    </div>
  );
};

export default Comments;
