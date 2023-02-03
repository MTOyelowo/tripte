import { FC } from "react";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";

interface Props {
  busy?: boolean;
  label?: string;
  liked?: boolean;
  onClick?(): void;
}

const LikeHeart: FC<Props> = ({
  liked = false,
  label,
  onClick,
}): JSX.Element => {
  return (
    <button
      type="button"
      className="text-primary-dark dark:text-primary flex -space-x-2 outline-none"
      onClick={onClick}
    >
      {liked ? (
        <RiHeartFill
          size={36}
          className="hover:bg-[#F0607D] p-[5px] transition-colors rounded-full text-[#DC143C] hover:text-white dark:text-[#F7A7B7]"
        />
      ) : (
        <RiHeartLine
          size={36}
          className="hover:bg-[#F0607D] p-[5px] hover:text-white rounded-full"
        />
      )}
      <span className="p-2">{label}</span>
    </button>
  );
};

export default LikeHeart;
