import { Request, Response } from "express";
import { blogService } from "./blog.service";
import catchAsync from "../../../utils/catchAsync";
import sendsResponse from "../../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

import { userService } from "../User/user.service";

import AppError from "../../../Error/AppError";

const postBlog = async (req: Request, res: Response) => {
  const blog = req.body;
  const newBlog = {
    ...blog,
    author: req.user?._id,
  };

  const result = await blogService.postBloginDb(newBlog);
  const { _id, author, title, content, isPublished } = result;
  res.status(201).send({
    success: true,
    message: "Blog Created Succefully",
    StatusCode: 201,
    data: {
      _id,
      title,

      content,
      isPublished,
      author,
    },
  });
};

const updateBlog = catchAsync(async (req, res) => {
  const result2 = await blogService.getBloginDb(req.params.id);
  if (!result2) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
  }
  const { author } = result2;
  const findAuthor = await userService.getUserfromDb(author);
  // console.log(req.user?.email);
  if (findAuthor?.email !== req?.user?.email) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "You are Not Unauthorizedzzz");
  } else {
    await blogService.updateBloginDb(req.params.id, req.body);
    const result3 = await blogService.getBloginDb(req.params.id);
    if (!result3) {
      throw new AppError(StatusCodes.NOT_FOUND, "Blog not found after update");
    }
    const { _id, title, content, author, isPublished } = result3;

    sendsResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Updated  Succesfully",

      data: {
        _id,
        title,
        content,
        author,
        isPublished,
      },
    });
  }
});

const deleteBlog = catchAsync(async (req, res) => {
  await blogService.deleteFromDb(req.params.id);
  sendsResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog Deleted  Succesfully",
  });
});
const deleteUsersBlog = catchAsync(async (req, res) => {
  const findBlog = await blogService.getBloginDb(req.params.id);
  const auhtorId = findBlog?.author._id.toString();

  const findUserBlog = await userService.getUserfromDb(auhtorId as string);
  if (req.user?.email !== findUserBlog?.email) {
    throw new AppError(StatusCodes.FORBIDDEN, "this is not your Blog");
  }

  await blogService.deleteFromDb(req.params.id);
  sendsResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "BLog Deleted succesfully",
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getAllBlogFromDb(req.query);
  sendsResponse(res, {
    success: true,
    message: "All Data",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const Blogcontroller = {
  postBlog,
  updateBlog,
  deleteBlog,
  deleteUsersBlog,
  getAllBlogs,
};
