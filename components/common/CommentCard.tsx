import { FC, ReactNode, useState } from "react";
import ProfileIcon from "./ProfileIcon";
import dateFormat from "dateformat";
import parse from "html-react-parser";
import {
  BsFillReplyAllFill,
  BsFillTrashFill,
  BsPencilSquare,
} from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { RiReplyAllLine, RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import CommentForm from "./CommentForm";
import { CommentResponse } from "../../utils/types";
import LikeHeart from "./LikeHeart";

interface Props {
  comment: CommentResponse;
  showControls?: boolean;
  onUpdateSubmit?(content: string): void;
  onReplySubmit?(content: string): void;
  onDeleteClick?(): void;
  onLikeClicked?(): void;
}

const CommentCard: FC<Props> = ({
  comment,
  onUpdateSubmit,
  onReplySubmit,
  onDeleteClick,
  onLikeClicked,
  showControls = false,
}): JSX.Element => {
  const { owner, content, createdAt, likedByOwner, likes, chiefComment } =
    comment;
  const { name, avatar } = owner;

  const [showForm, setShowForm] = useState(false);
  const [initialState, setInitialState] = useState("");

  const displayReplyForm = () => {
    setInitialState("");
    setShowForm(true);
  };
  const hideReplyForm = () => {
    setShowForm(false);
  };

  const handleOnReplyClick = () => {
    displayReplyForm();
  };
  const handleOnEditClick = () => {
    displayReplyForm();
    setInitialState(content);
  };

  const handleCommentSubmit = (comment: string) => {
    // if initialState exists, we want to update the comment else, we want to submit a new comment
    if (initialState) {
      onUpdateSubmit && onUpdateSubmit(comment);
    } else {
      onReplySubmit && onReplySubmit(comment);
    }
    hideReplyForm();
  };

  return (
    <div className="flex space-x-3 p-2 rounded-2xl bg-[#FDEDF1] dark:bg-[#9D0F2B]">
      <ProfileIcon nameInitial={name[0].toUpperCase()} avatar={avatar} />

      <div className="flex-1">
        <div className="flex space-x-2 items-baseline">
          <h1 className="text-md sm:text-lg text-primary-dark dark:text-primary font-semibold">
            {name}
          </h1>
          <span className="text-[10px] sm:text-xs text-gray-400">
            {dateFormat(createdAt, "d-mmm-yyyy")}
          </span>
        </div>
        <div className="text-primary-dark dark:text-primary text-sm sm:text-base pb-5">
          {parse(content)}
        </div>

        <div className="flex space-x-5 justify-between">
          <div className="flex space-x-5">
            <LikeHeart
              liked={likedByOwner}
              label={likes + ""}
              onClick={onLikeClicked}
            />
            {chiefComment && (
              <Button onClick={handleOnReplyClick}>
                <RiReplyAllLine size={22} />
              </Button>
            )}
          </div>
          {showControls && (
            <div className="flex space-x-5">
              <Button onClick={handleOnEditClick}>
                <RiEditLine size={22} />
              </Button>
              <Button onClick={onDeleteClick}>
                <RiDeleteBin5Line size={22} />
              </Button>
            </div>
          )}
        </div>

        {showForm && (
          <div className="mt-3">
            <CommentForm
              onSubmit={handleCommentSubmit}
              onClose={hideReplyForm}
              initialState={initialState}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;

interface ButtonProps {
  children: ReactNode;
  onClick?(): void;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-primary-dark dark:text-primary space-x-1 hover:bg-[#F0607D] p-2 hover:text-white rounded-full"
    >
      {children}
    </button>
  );
};
