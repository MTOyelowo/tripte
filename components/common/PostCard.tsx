import Image from "next/legacy/image";
import { FC } from "react";
import { PostDetail } from "../../utils/types";
import dateformat from "dateformat";
import Link from "next/link";

interface Props {
  post: PostDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?(): void;
}

const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) return text;

  return text.substring(0, trimBy).trim() + "...";
};

const PostCard: FC<Props> = ({
  post,
  busy,
  onDeleteClick,
  controls = false,
}): JSX.Element => {
  const { title, slug, meta, tags, thumbnail, createdAt, category } = post;
  return (
    <div className="justify-center items-center bg-primary dark:bg-primary-dark flex flex-row border-b p-4 space-x-4 w-full my-4 sm:border-l sm:border-b-0">
      <div className="rounded">
        {!thumbnail ? (
          <div className="w-full h-full flex items-center justify-center text-secondary-dark opacity-50 font-semibold italic">
            No Image
          </div>
        ) : (
          <Image
            src={thumbnail}
            layout="intrinsic"
            alt="thumbnail"
            width={100}
            height={100}
            className="rounded-2xl relative"
          />
        )}
      </div>
      {/*Post Info*/}
      <div className="justify-center flex-1 flex flex-col">
        <Link href={"/" + slug}>
          <div className="flex items-center justify-between text-sm text-primary-dark dark:text-primary">
            <div className="flex items-center space-x-2">
              <span className="text-[#DC143C] font-medium text-xs">
                {category}
              </span>
            </div>
            <span>{dateformat(createdAt, "d-mmm-yyyy")}</span>
          </div>
          <h1 className="font-bold text-primary-dark dark:text-primary">
            {trimText(title, 50)}
          </h1>
          <p className="text-secondary-dark dark:text-secondary-light">
            {trimText(meta, 100)}
          </p>
          <div className="flex items-center justify-between text-sm text-primary-dark dark:text-primary">
            <div className="flex items-center space-x-2 italic text-sm">
              {tags.map((tag, index) => (
                <span key={tag + index}>#{tag}</span>
              ))}
            </div>
          </div>
        </Link>

        {controls && (
          <div className="flex justify-end items-center h-8 mt-auto space-x-4 text-[#DC143C]">
            {busy ? (
              <span className="animate-pulse">Removing Post...</span>
            ) : (
              <>
                <Link href={"/admin/posts/update/" + slug}>
                  <span className="hover:bg-[#DC143C] hover:px-4 hover:py-1 hover:text-white hover:rounded-full">
                    Edit
                  </span>
                </Link>
                <button
                  onClick={onDeleteClick}
                  className="hover:bg-[#DC143C] hover:px-4 hover:py-1 hover:text-white hover:rounded-full"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
