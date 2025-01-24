import { model, Schema } from "mongoose";
import { Blog } from "./blog.interface";

const blogSchema = new Schema<Blog>(
  {
    title: { type: String },
    content: { type: String },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user-collection",
    },
    isPublished: { type: Boolean },
  },
  { timestamps: true },
);

const BlogModel = model<Blog>("Blogs", blogSchema);
export default BlogModel;
