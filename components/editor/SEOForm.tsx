import { ChangeEventHandler, FC, useEffect, useState } from "react";
import classnames from "classnames";
import slugify from "slugify";

export interface SeoResult {
  meta: string;
  slug: string;
  tags: string;
  category: string;
}

interface Props {
  initialValue?: SeoResult;
  title?: string;
  onChange(result: SeoResult): void;
}

const commonInput =
  "w-full bg-transparent outline-none border-2 border-secondary-dark focus:border-primary-dark focus:dark:border-primary rounded transition text-primary-dark dark:text-primary p-2";

const SEOForm: FC<Props> = ({
  title = "",
  onChange,
  initialValue,
}): JSX.Element => {
  const [values, setValues] = useState({
    meta: "",
    slug: "",
    tags: "",
    category: "",
  });

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = ({ target }) => {
    let { name, value } = target;
    if (name === "meta") value = value.substring(0, 150);
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    onChange(newValues);
  };

  useEffect(() => {
    const slug = slugify(title.toLowerCase(), {
      strict: true,
    });
    const newValues = { ...values, slug };
    setValues(newValues);
    onChange(newValues);
  }, [title]);

  useEffect(() => {
    if (initialValue) {
      setValues({
        ...initialValue,
        slug: slugify(initialValue.slug, { strict: true }),
      });
    }
  }, [initialValue]);

  const { meta, slug, tags, category } = values;

  return (
    <div className="space-y-4">
      <h1 className="text-primary-dark dark:text-primary text-xl font-semibold">
        SEO Section
      </h1>

      <Input
        name="slug"
        value={slug}
        onChange={handleChange}
        placeholder="slug-goes-here"
        label="Slug:"
      />

      <Input
        name="tags"
        value={tags}
        onChange={handleChange}
        placeholder="Hope, Research, Critical Thinking"
        label="Tags:"
      />

      <CategoryInput
        name="category"
        value={category}
        onChange={handleChange}
        placeholder="Poetry, Article, Essay, Story, Opinion, Thought, Picture, Play, Podcast"
        label="Category:"
      />

      <div className="relative">
        <textarea
          name="meta"
          value={meta}
          onChange={handleChange}
          className={classnames(commonInput, "text-lg h-20 resize-none")}
          placeholder="Meta description 150 characters will be fine."
        ></textarea>
        <p className="absolute bottom-3 right-3 text-primary-dark dark:text-primary">
          {meta.length}/150
        </p>
      </div>
    </div>
  );
};

const Input: FC<{
  name?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ name, value, placeholder, label, onChange }) => {
  return (
    <label className="block relative">
      <span className="absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary pl-2">
        {label}
      </span>
      <input
        name={name}
        value={value}
        type="text"
        placeholder={placeholder}
        className={classnames(commonInput, "italic pl-10")}
        onChange={onChange}
      />
    </label>
  );
};

const CategoryInput: FC<{
  name?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ name, value, placeholder, label, onChange }) => {
  return (
    <label className="block relative">
      <span className="absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary pl-2">
        {label}
      </span>
      <input
        name={name}
        value={value}
        type="text"
        placeholder={placeholder}
        className={classnames(commonInput, "italic pl-[70px]")}
        onChange={onChange}
      />
    </label>
  );
};

export default SEOForm;
