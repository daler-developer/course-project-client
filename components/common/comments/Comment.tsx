import { Comment as AntDComment } from "antd";
import { IComment } from "../../../types";

interface IProps {
  comment: IComment;
}

const Comment = ({ comment }: IProps) => {
  return (
    <AntDComment author={comment.creator.username} content={comment.text} />
  );
};

export default Comment;
