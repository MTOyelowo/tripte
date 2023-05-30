import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Editor, { FinalPost } from "../../../../components/editor";
import AdminLayout from "../../../../components/layout/AdminLayout";
import { generateFormData } from "../../../../utils/helper";

interface Props {}

const Create: NextPage<Props> = () => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showFail, setShowFail] = useState<boolean>(false);

  const [failMessage, setFailMessage] = useState<string>("");

  const timerId = useRef<NodeJS.Timeout | null>(null);

  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (post: FinalPost) => {
    setCreating(true);
    try {
      // generate formdata
      const formData = generateFormData(post);

      // submit post
      const { data } = await axios.post("/api/posts", formData);
      setShowSuccess(true);
      router.push("/admin/posts/update/" + data.post.slug);
      //console.log(data);
    } catch (error: any) {
      setFailMessage(error.response.data.error);
      setShowFail(true);
    }
    setCreating(false);
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
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor
          onSubmit={handleSubmit}
          busy={creating}
          showPostSuccess={showSuccess}
          showPostFail={showFail}
          postFailMessage={failMessage}
        />
      </div>
    </AdminLayout>
  );
};

export default Create;
