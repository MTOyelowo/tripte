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
import Comments from "../components/common/Comments";
import LikeHeart from "../components/common/LikeHeart";
import { useCallback, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { signIn } from "next-auth/react";
import axios from "axios";
import User from "../models/User";
import AuthorInfo from "../components/common/AuthorInfo";
import Share from "../components/common/Share";
import Link from "next/link";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const host = "https://triptemedia.vercel.app/";

const SinglePost: NextPage<Props> = ({ post }) => {
  const [liking, setLiking] = useState(false);

  const [likes, setLikes] = useState({ likedByOwner: false, count: 0 });
  const {
    id,
    title,
    content,
    tags,
    meta,
    slug,
    thumbnail,
    createdAt,
    category,
    author,
    relatedPosts,
  } = post;

  const user = useAuth();

  const getLikeLabel = useCallback((): string => {
    const { likedByOwner, count } = likes;

    if (likedByOwner && count === 1) return "You liked this post";

    if (likedByOwner) return `You and ${count - 1} other(s) liked this post`;

    if (count === 0) return "Like Post";

    if (count === 1) {
      return count + " person liked this post";
    }

    return count + " people liked this post";
  }, [likes]);

  const handleOnLikeClicked = async () => {
    setLiking(true);
    try {
      if (!user) return await signIn("google");

      const { data } = await axios.post(`/api/posts/update-like?postId=${id}`);
      setLikes({ likedByOwner: !likes.likedByOwner, count: data.newLikes });
    } catch (error) {
      console.log(error);
    }
    setLiking(false);
  };

  useEffect(() => {
    axios(`/api/posts/like-status?postId=${id}`)
      .then(({ data }) =>
        setLikes({ likedByOwner: data.likedByOwner, count: data.likesCount })
      )
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <DefaultLayout title={title} desc={meta}>
      <div className="lg:px-0 pb-20 px-3">
        {thumbnail ? (
          <div className="relative aspect-video">
            {<Image src={thumbnail} alt={title} fill />}
          </div>
        ) : null}

        <div>
          <h3 className="text-base font-semibold text-[#DC143C]">{category}</h3>
          <div className="w-6 h-[3.5px] bg-[#DC143C]" />
        </div>
        <div className="mt-2 border-l-[3.5px] border-l-[#DC143C]">
          <h1 className="text-3xl sm:text-5xl font-semibold text-primary-dark dark:text-primary py-2 pl-1">
            {title}
          </h1>
        </div>

        <div className="flex items-center justify-between py-2 text-secondary-dark dark:text-secondary-light italic text-[11px]">
          <div className="space-x-2">
            {tags.map((t, index) => (
              <span key={t + index}>#{t}</span>
            ))}
          </div>
          <span>{dateFormat(createdAt, "d-mmm-yyyy")}</span>
        </div>

        <div className="py-5 sticky top-0 z-50 bg-primary dark:bg-primary-dark transition">
          <Share url={host + slug} />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-full mx-auto text-justify text-sm md:text-base">
          {parse(content)}
        </div>

        <div className="py-10">
          <LikeHeart
            label={getLikeLabel()}
            onClick={handleOnLikeClicked}
            liked={likes.likedByOwner}
            busy={liking}
          />
        </div>

        <div className="pt-5">
          <AuthorInfo profile={JSON.parse(author)} />
        </div>

        <div className="mt-10 shadow-md border border-gray-50 rounded-lg text-primary-dark dark:text-gray-200 transition dark:border-gray-800 dark:shadow-gray-800 p-2">
          <h3 className="text-xl font-semibold border-b dark:border-b-gray-800 p-2 mb-4 transition ">
            Related Posts:
          </h3>
          <div className="flex flex-col space-y-4">
            {relatedPosts.length ? (
              relatedPosts.map((post) => {
                return (
                  <Link
                    href={post.slug}
                    key={post.id}
                    className="font-semibold border-b border-b[#fabac7] dark:border-b-gray-800 hover:scale-95 transition"
                  >
                    <span className="">{post.title}</span>
                  </Link>
                );
              })
            ) : (
              <h1 className="text-center font-semibold text-gray-500 animate-pulse">
                Sorry...No Related Post Available!!!
              </h1>
            )}
          </div>
        </div>

        <Comments belongsTo={id} />
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
    author: string;
    relatedPosts: {
      id: string;
      title: string;
      slug: string;
    }[];
  };
}

export const getStaticProps: GetStaticProps<
  StaticPropsResponse,
  { slug: string }
> = async ({ params }) => {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params?.slug }).populate("author");

    if (!post) return { notFound: true };

    // fetching related posts according to tags
    const posts = await Post.find({
      tags: { $in: [...post.tags] },
      _id: { $ne: post._id },
    })
      .sort({ createdAt: "desc" })
      .limit(5)
      .select("slug title");

    const relatedPosts = posts.map((p) => {
      return {
        id: p._id.toString(),
        title: p.title,
        slug: p.slug,
      };
    });

    const {
      _id,
      title,
      content,
      category,
      meta,
      slug,
      tags,
      thumbnail,
      createdAt,
      author,
    } = post;

    const admin = await User.findOne({ role: "admin" });
    const authorInfo = (author || admin) as any;

    const postAuthor = {
      id: authorInfo._id,
      name: authorInfo.name,
      image: authorInfo.image,
      twitter: authorInfo.twitter,
      facebook: authorInfo.facebook,
      message: `This post is written by ${authorInfo.name}. ${
        authorInfo.name.split(" ")[0]
      } is a poet and fullstack developer.`,
    };

    return {
      props: {
        post: {
          id: _id.toString(),
          title,
          content,
          category,
          meta,
          slug,
          tags,
          thumbnail: thumbnail?.url || "",
          createdAt: createdAt.toString(),
          author: JSON.stringify(postAuthor),
          relatedPosts,
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
};
