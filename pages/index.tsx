import axios from "axios";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useSession } from "next-auth/react";
import { SetStateAction, useEffect, useState } from "react";
import InfiniteScrollPosts from "../components/common/InfiniteScrollPosts";
import DefaultLayout from "../components/layout/DefaultLayout";
import useAuth from "../hooks/useAuth";
import { formatPosts, readPostsFromDb } from "../lib/utils";
import { filterPosts } from "../utils/helper";
import { PostDetail, UserProfile } from "../utils/types";
import ScrollNav from "@/components/common/nav/ScrollNav";
import { useRouter } from "next/router";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

let pageNo = 0;
const limit = 9;

const Home: NextPage<Props> = ({ posts }) => {
  const router = useRouter();

  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(posts.length >= limit);
  const [category, setCategory] = useState<string>("All");

  const selectCategory = (category: string) => {
    setCategory(category);
  };

  const profile = useAuth();

  const isAdmin = profile && profile.role === "admin";

  const fetchMorePosts = async () => {
    try {
      pageNo++;
      const { data } = await axios(
        `/api/posts?limit=${limit}&skip=${postsToRender.length}`
      );
      if (data.posts.length < limit) {
        setPostsToRender([...postsToRender, ...data.posts]);
        setHasMorePosts(false);
      } else setPostsToRender([...postsToRender, ...data.posts]);
    } catch (error) {
      setHasMorePosts(false);
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="">
        <ScrollNav selectCategory={selectCategory} />
      </div>
      <div className="pb-20">
        <InfiniteScrollPosts
          hasMore={hasMorePosts}
          next={fetchMorePosts}
          dataLength={postsToRender.length}
          posts={postsToRender}
          showControls={isAdmin}
          onPostRemoved={(post) => setPostsToRender(filterPosts(posts, post))}
          filterCategory={category}
        />
      </div>
    </DefaultLayout>
  );
};

interface ServerSideResponse {
  posts: PostDetail[];
}

export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async () => {
  try {
    const posts = await readPostsFromDb(limit, pageNo);
    //format posts
    const formattedPosts = formatPosts(posts);
    return {
      props: {
        posts: formattedPosts,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default Home;
