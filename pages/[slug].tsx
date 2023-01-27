import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import parse from "html-react-parser";
import DefaultLayout from "../components/layout/DefaultLayout";
import dbConnect from "../lib/dbConnect";
import Post from "../models/Post";
import Image from "next/image";
import dateFormat from "dateformat";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { TbMinusVertical } from "react-icons/tb";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePost: NextPage<Props> = ({ post }) => {
  const { title, content, tags, meta, slug, thumbnail, createdAt, category } =
    post;
  return (
    <DefaultLayout title={title} desc={meta}>
      <div className="pb-20 mx-2">
        {thumbnail ? (
          <div className="relative aspect-video">
            {<Image src={thumbnail} alt={title} fill />}
          </div>
        ) : null}

        <div>
          <h3 className="text-base font-semibold text-[#DC143C]">{category}</h3>
          <div className="w-6 h-[3px] bg-[#DC143C]" />
        </div>
        <div className="mt-2 border-l-[3.5px] border-l-[#DC143C]">
          <h1 className="text-3xl sm:text-5xl font-semibold text-primary-dark dark:text-primary py-2 pl-1">
            {title}
          </h1>
        </div>

        <div className="flex items-center justify-between py-2 text-secondary-dark dark:text-secondary-light italic text-sm">
          <div className="space-x-2">
            {tags.map((t, index) => (
              <span key={t + index}>#{t}</span>
            ))}
          </div>
          <span>{dateFormat(createdAt, "d-mmm-yyyy")}</span>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-full mx-auto">
          {parse(content)}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SinglePost;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    await dbConnect();
    const posts = await Post.find().select("slug");
    const paths = posts.map(({ slug }) => ({ params: { slug } }));
    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [{ params: { slug: "/" } }],
      fallback: false,
    };
  }
};

interface StaticPropsResponse {
  post: {
    id: string;
    title: string;
    content: string;
    category: string;
    meta: string;
    tags: string[];
    slug: string;
    thumbnail: string;
    createdAt: string;
  };
}

export const getStaticProps: GetStaticProps<
  StaticPropsResponse,
  { slug: string }
> = async ({ params }) => {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params?.slug });
    if (!post) return { notFound: true };

    const {
      _id,
      title,
      content,
      meta,
      slug,
      tags,
      thumbnail,
      createdAt,
      category,
    } = post;

    return {
      props: {
        post: {
          id: _id.toString(),
          title,
          content,
          meta,
          slug,
          tags,
          category,
          thumbnail: thumbnail?.url || "",
          createdAt: createdAt.toString(),
        },
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
