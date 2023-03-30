import { FC } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import parse from "html-react-parser";
import { trimText } from "../../../utils/helper";
import ProfileIcon from "../../common/ProfileIcon";
import { LatestComment } from "../../../utils/types";

interface Props {
  comment: LatestComment;
}

const LatestCommentListCard: FC<Props> = ({ comment }): JSX.Element => {
  const { owner, belongsTo, content } = comment;
  const parsed = content.replace(/[<p></p>]/g, "");

  return (
    <div className="flex space-x-2">
      <ProfileIcon nameInitial={owner.name[0]} image={owner.image} />

      <div className="flex-1">
        <p className="font-semibold text-primary-dark dark:text-primary transition text-sm">
          {owner.name}{" "}
          <span className="text-xs text-secondary-dark dark:text-gray-300">
            commented on
          </span>
        </p>

        <a
          href={"/" + belongsTo.slug}
          target="_blank"
          rel="noreferrer noopener"
          className="text-secondary-dark dark:text-gray-300 hover:underline"
        >
          <div className="flex items-center space-x-2 text-sm">
            <BsBoxArrowUpRight size={12} />
            {trimText(belongsTo.title, 30)}
          </div>
        </a>

        <div className="text-primary-dark dark:text-primary transition text-xs py-1">
          {trimText(parsed, 100)}
        </div>
      </div>
    </div>
  );
};

export default LatestCommentListCard;
