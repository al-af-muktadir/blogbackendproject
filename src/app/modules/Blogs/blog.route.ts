import express from "express";
import { Blogcontroller } from "./blog.controller";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/blogs", auth("user"), Blogcontroller.postBlog);
router.patch("/blogs/:id", auth("user"), Blogcontroller.updateBlog);
router.delete("/blogs/:id", auth("user"), Blogcontroller.deleteUsersBlog);
router.delete("/admin/blogs/:id", auth("admin"), Blogcontroller.deleteBlog);
router.get("/blogs", Blogcontroller.getAllBlogs);

export const Blogrouter = router;
