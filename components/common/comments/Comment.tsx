import { Comment as AntDComment } from "antd";
import { IComment } from "../../../types";

interface IProps {
  comment: IComment;
}

const Comment = ({ comment }: IProps) => {
  return <AntDComment author="Daler" content={comment.text} />;
};

export default Comment;
