import axios from "axios";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Editor, { FinalPost } from "../../../../components/editor";
import AdminLayout from "../../../../components/layout/AdminLayout";
import dbConnect from "../../../../lib/dbConnect";
import Post from "../../../../models/Post";
import { generateFormData } from "../../../../utils/helper";
import { useEffect, useRef, useState } from "react";

interface PostResponse extends FinalPost {
  id: string;
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Update: NextPage<Props> = ({ post }) => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showFail, setShowFail] = useState<boolean>(false);

  const [failMessage, setFailMessage] = useState<string>("");

  const timerId = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = async (post: FinalPost) => {
    try {
      // generate formdata
      const formData = generateFormData(post);

      // submit post
      const { data } = await axios.patch("/api/posts/" + post.id, formData);
      setShowSuccess(true);
      //console.log(data);
    } catch (error: any) {
      setFailMessage(error.response.data.error);
      setShowFail(true);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      timerId.current = setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    }

    if (showFail) {
      timerId.current = setTimeout(() => {
        setShowFail(false);
      }, 4000);
    }

    return () => {
      clearTimeout(timerId.current!);
    };
  }, [showFail, showSuccess]);

  return (
    <AdminLayout title="Update">
      <div className="max-w-4xl mx-auto">
        <Editor
          initialValue={post}
          onSubmit={handleSubmit}
          btnTitle="Update"
          showUpdateSuccess={showSuccess}
          showUpdateFail={showFail}
          failMessage={failMessage}
        />
      </div>
    </AdminLayout>
  );
};

interface ServerSideResponse {
  post: PostResponse;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async (context) => {
  try {
    const slug = context.query.slug as string;

    await dbConnect();
    const post = await Post.findOne({ slug });
    if (!post) return { notFound: true };

    const { _id, title, content, thumbnail, tags, meta, category } = post;

    return {
      props: {
        post: {
          id: _id.toString(),
          title,
          content,
          tags: tags.join(", "),
          thumbnail: thumbnail?.url || "",
          slug,
          category,
          meta,
        },
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default Update;
