import { ChangeEventHandler, FC, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, getMarkRange, Range } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import TipTapImage from "@tiptap/extension-image";
import ToolBar from "./ToolBar";
import EditLink from "./Link/EditLink";
import YouTube from "@tiptap/extension-youtube";
import GalleryModal, { ImageSelectionResult } from "./GalleryModal";
import axios from "axios";
import SEOForm, { SeoResult } from "./SEOForm";
import ActionButton from "../common/ActionButton";
import ThumbnailSelector from "./ThumbnailSelector";
import { BiTargetLock } from "react-icons/bi";
import AlertModal from "../common/AlertModal";

export interface FinalPost extends SeoResult {
  id?: string;
  title: string;
  content: string;
  thumbnail?: File | string;
}

interface Props {
  initialValue?: FinalPost;
  btnTitle?: string;
  busy?: boolean;
  onSubmit(post: FinalPost): void;
  showUpdateSuccess?: boolean;
  showUpdateFail?: boolean;
  showPostSuccess?: boolean;
  showPostFail?: boolean;
  failMessage?: string;
  postFailMessage?: string;
}
3;
const Editor: FC<Props> = ({
  initialValue,
  btnTitle = "Submit",
  busy = false,
  onSubmit,
  showUpdateSuccess,
  showUpdateFail,
  failMessage,
  showPostSuccess,
  showPostFail,
  postFailMessage,
}): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);
  const [images, setImages] = useState<{ src: string }[]>([]);
  const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();

  const [uploading, setUploading] = useState(false);
  const [post, setPost] = useState<FinalPost>({
    title: "",
    content: "",
    meta: "",
    tags: "",
    slug: "",
    category: "",
  });

  const fetchImages = async () => {
    const { data } = await axios("/api/image");
    setImages(data.images);
  };

  const handleImageUpload = async (image: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios.post("/api/image", formData);
    setUploading(false);

    setImages([data, ...images]);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Superscript.configure({
        HTMLAttributes: {
          class: "italic",
        },
      }),
      Subscript.configure({
        HTMLAttributes: {
          class: "italic",
        },
      }),
      Placeholder.configure({ placeholder: "Type Something" }),
      YouTube.configure({
        // width: 426,
        // height: 240,
        HTMLAttributes: {
          class: "w-full aspect-video",
        },
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: "mx-auto rounded-md",
        },
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class:
          "prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full",
      },
    },
  });

  const handleImageSelection = (result: ImageSelectionResult) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: result.src, alt: result.altText })
      .run();
  };

  const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setPost({ ...post, title: target.value });

  const updateSeoValue = (result: SeoResult) => setPost({ ...post, ...result });

  const updateThumbnail = (file: File) => setPost({ ...post, thumbnail: file });

  const handleSubmit = () => {
    if (!editor) return;
    onSubmit({ ...post, content: editor.getHTML() });
  };

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (initialValue) {
      setPost({ ...initialValue });
      editor?.commands.setContent(initialValue.content);

      const { meta, slug, tags, category } = initialValue;

      setSeoInitialValue({ meta, slug, tags, category });
    }
  }, [initialValue, editor]);

  return (
    <>
      <div className="p-3 dark:bg-primary-dark bg-primary transition">
        <div className="sticky top-0 z-10 dark:bg-primary-dark bg-primary">
          <div className="absolute -top-5 w-full flex items-center justify-center z-10">
            {showUpdateSuccess && (
              <AlertModal text="Update Successful" status="success" />
            )}
            {showUpdateFail && (
              <AlertModal
                text="Update Failed"
                secondaryText={failMessage}
                status="fail"
              />
            )}
            {showPostSuccess && (
              <AlertModal text="Post Added" status="success" />
            )}
            {showPostFail && (
              <AlertModal
                text="Post Failed"
                secondaryText={postFailMessage}
                status="fail"
              />
            )}
          </div>
          {/* Thumbnail Selector and Submit Button */}
          <div className="flex items-center justify-between mb-3">
            <ThumbnailSelector
              initialValue={post.thumbnail as string}
              onChange={updateThumbnail}
            />
            <div className="inline-block">
              <ActionButton
                busy={busy}
                title={btnTitle}
                onClick={handleSubmit}
              />
            </div>
          </div>

          {/*Title Input*/}
          <input
            placeholder="Title"
            type="text"
            value={post.title}
            onChange={updateTitle}
            className="py-2 mb-3 outline-none bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic text-primary-dark dark:text-primary"
          />
          <ToolBar
            editor={editor}
            onOpenImageClick={() => setShowGallery(true)}
          />
          <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
        </div>

        {editor ? <EditLink editor={editor} /> : null}
        <EditorContent editor={editor} className="min-h-[300px]" />

        <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />

        <SEOForm
          onChange={updateSeoValue}
          title={post.title}
          initialValue={seoInitialValue}
        />
      </div>

      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
        images={images}
        onFileSelect={handleImageUpload}
        uploading={uploading}
      />
    </>
  );
};

export default Editor;
