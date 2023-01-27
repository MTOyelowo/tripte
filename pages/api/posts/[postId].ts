import formidable from "formidable";
import { NextApiHandler } from "next";
import cloudinary from "../../../lib/cloudinary";
import { isAdmin, readFile } from "../../../lib/utils";
import { postValidationSchema, validateSchema } from "../../../lib/validator";
import Post from "../../../models/Post";
import { IncomingPost } from "../../../utils/types";

export const config = {
    api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
    const { method } = req;
    switch (method) {
        case "PATCH": return updatePost(req, res)
        case "DELETE": return removePost(req, res)
        default: res.status(404).send("Not Found!")
    }
};

const removePost: NextApiHandler = async (req, res) => {
    try {
        const admin = await isAdmin(req, res);
        if (!admin) return res.status(401).json({ error: "Unauthorized Request!" })
        const postId = req.query.postId as string;

        const post = await Post.findByIdAndDelete(postId)
        if (!post) return res.status(404).json({ error: "Post not found!" });

        // remove thumbnail from cloud storage
        const publicId = post.thumbnail?.public_id
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
        res.json({ removed: true });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}


const updatePost: NextApiHandler = async (req, res) => {

    const admin = await isAdmin(req, res);
    if (!admin) return res.status(401).json({ error: "Unauthorized Request!" })

    const postId = req.query.postId as string
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found!" });

    const { files, body } = await readFile<IncomingPost>(req)

    let tags = [];
    if (body.tags) tags = JSON.parse(body.tags as string);
    const error = validateSchema(postValidationSchema, { ...body, tags });
    if (error) return res.status(400).json({ error });

    const { title, content, meta, slug, category } = body;
    post.title = title;
    post.content = content;
    post.meta = meta;
    post.tags = tags;
    post.slug = slug;
    post.category = category;

    // Update thumbnail only if there is any

    const thumbnail = files.thumbnail as formidable.File
    if (thumbnail) {
        const { secure_url: url, public_id } = await cloudinary.uploader.upload(thumbnail.filepath, {
            folder: "tripte",
        });

        // Condition 1: The post can already have thumbnail
        // So remove old, upload new image and then update record inside DB.
        const publicId = post.thumbnail?.public_id
        if (publicId) await cloudinary.uploader.destroy(publicId)

        // Condition 2: The post can be without thumbnail
        // Just upload image and update record inside DB.
        post.thumbnail = { url, public_id }
    }

    await post.save()
    res.json({ post });
};

export default handler;