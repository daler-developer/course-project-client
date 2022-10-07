import { Spin } from "antd";
import { IComment } from "../../../types";
import FetchMoreBtn from "../FetchMoreBtn";
import Comment from "./Comment";

interface IProps {
  comments: IComment[];
  isFetching: boolean;
  onFetchNextPage: Function;
}
const Comments = ({ comments, isFetching, onFetchNextPage }: IProps) => {
  return (
    <div className="">
      <div className="flex flex-col gap-[5px]">
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>

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
