import Link from "next/link";
import { FC } from "react";
import { trimText } from "../../../utils/helper";

interface Props {
  title: string;
  meta: string;
  slug: string;
  onDeleteClick?(): void;
}

const LatestPostListCard: FC<Props> = ({
  title,
  meta,
  slug,
  onDeleteClick,
}): JSX.Element => {
  return (
    <div className="pb-2 border-b border-b-[#F8B8C5] dar">
      <h1 className="font-semibold text-sm text-primary-dark dark:text-primary transition">
        {trimText(title, 50)}
      </h1>
      <p className="text-sm text-secondary-dark">{trimText(meta, 100)}</p>

      <div className="flex items-center justify-end space-x-3">
        <Link href={"/admin/posts/update/" + slug}>
          <p className="text-primary-dark dark:text-primary transition hover:underline text-sm">
            Edit
          </p>
        </Link>
        <button
          onClick={onDeleteClick}
          className="text-primary-dark dark:text-primary transition hover:underline text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default LatestPostListCard;
