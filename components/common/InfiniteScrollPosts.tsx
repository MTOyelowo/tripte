import axios from "axios";
import { FC, ReactNode, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostDetail } from "../../utils/types";
import ConfirmModal from "./ConfirmModal";
import PostCard from "./PostCard";

interface Props {
  posts: PostDetail[];
  showControls?: boolean;
  hasMore: boolean;
  next(): void;
  dataLength: number;
  loader?: ReactNode;
  onPostRemoved(post: PostDetail): void;
  filterCategory?: string;
}

const InfiniteScrollPosts: FC<Props> = ({
  posts,
  showControls,
  hasMore,
  next,
  dataLength,
  loader,
  onPostRemoved,
  filterCategory,
}): JSX.Element => {
  const [removing, setRemoving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postToRemove, setPostToRemove] = useState<PostDetail | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<PostDetail[] | null>([]);

  const handleOnDeleteClick = (post: PostDetail) => {
    setPostToRemove(post);
    setShowConfirmModal(true);
  };

  const handleDeleteCancel = () => {
    setShowConfirmModal(false);
  };

  const handleOnDeleteConfirm = async () => {
    if (!postToRemove) return handleDeleteCancel();

    setShowConfirmModal(false);
    setRemoving(true);

    const { data } = await axios.delete(`/api/posts/${postToRemove.id}`);

    if (data.removed) onPostRemoved(postToRemove);

    setRemoving(false);
  };

  useEffect(() => {
    if (filterCategory) {
      setFilteredPosts(
        posts.filter((post) => post.category === filterCategory)
      );
    }

    if (filterCategory === "All") {
      setFilteredPosts(posts);
    }
  }, [filterCategory, posts]);

  const defaultLoader = (
    <p className="p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse">
      Loading...
    </p>
  );
  return (
    <>
      <InfiniteScroll
        hasMore={hasMore}
        next={next}
        dataLength={dataLength}
        loader={loader || defaultLoader}
      >
        <div className="max-w-4xl mx-auto p-3">
          <div className="flex-row md:grid sm:gap-4 md:grid-cols-2 md:gap-4 pb-20">
            {filteredPosts?.length ? (
              filteredPosts?.map((post, index) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  controls={showControls}
                  onDeleteClick={() => handleOnDeleteClick(post)}
                  busy={post.id === postToRemove?.id && removing}
                />
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <h1 className="font-semibold text-gray-600 animate-pulse text-center">
                  Sorry!!! No {filterCategory} post yet...
                </h1>
              </div>
            )}
          </div>
        </div>
      </InfiniteScroll>
      <ConfirmModal
        visible={showConfirmModal}
        onClose={handleDeleteCancel}
        onCancel={handleDeleteCancel}
        onConfirm={handleOnDeleteConfirm}
        title="Are you sure?"
        subTitle="This action is irreversible and will remove post permanently!"
      />
    </>
  );
};

export default InfiniteScrollPosts;
