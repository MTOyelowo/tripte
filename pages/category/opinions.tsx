import axios from "axios";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import InfiniteScrollPosts from "../../components/common/InfiniteScrollPosts";
import DefaultLayout from "../../components/layout/DefaultLayout";
import useAuth from "../../hooks/useAuth";
import {
  formatPosts,
  readOpinionPostsFromDb,
  readPoetryPostsFromDb,
  readPostsFromDb,
} from "../../lib/utils";
import { filterPosts } from "../../utils/helper";
import { PostDetail, UserProfile } from "../../utils/types";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

let pageNo = 0;
const limit = 9;

const Opinions: NextPage<Props> = ({ posts }) => {
  const router = useRouter();
  const query = router.query;
  const category = query.category as string;

  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(posts.length >= limit);

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
      <div className="pb-20">
        {postsToRender.length ? (
          <InfiniteScrollPosts
            hasMore={hasMorePosts}
            next={fetchMorePosts}
            dataLength={postsToRender.length}
            posts={postsToRender}
            showControls={isAdmin}
            onPostRemoved={(post) => setPostsToRender(filterPosts(posts, post))}
          />
        ) : (
          <h1 className="text-[16px] text-center text-gray-500 animate-pulse">
            Sorry!!! No Opinion Piece Available
          </h1>
        )}
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
    const posts = await readOpinionPostsFromDb(limit, pageNo);
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

export default Opinions;
