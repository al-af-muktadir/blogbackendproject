import { SortOrder } from "mongoose";
import { Blog } from "./blog.interface";
import BlogModel from "./blog.model";
import { ObjectId } from "mongodb";

const postBloginDb = async (blog: Blog) => {
  const result = (await BlogModel.create(blog)).populate("author");

  return result;
};

const updateBloginDb = async (id: string, details: Blog) => {
  const result = await BlogModel.updateOne(
    { _id: new ObjectId(id) },
    { $set: details },
  );
  return result;
};

const getBloginDb = async (id: string) => {
  const result = await BlogModel.findOne({ _id: new ObjectId(id) }).populate(
    "author",
  );
  return result;
};
const deleteFromDb = async (id: string) => {
  const result = await BlogModel.deleteOne({ _id: new ObjectId(id) });
  return result;
};

const getAllBlogFromDb = async (query: Record<string, unknown>) => {
  const copyQueries = { ...query };

  const SearchFields = ["title", "content"];

  const excludedQueries = ["search", "filter", "sortBy", "sortOrder"];

  // console.log(query, query.sortBy, query.sortOrder, query.filter);

  const defaultSortField = "createdAt";

  const validFields = ["title", "createdAt"];

  const sortField = validFields.includes(query.sortBy as string)
    ? query.sortBy
    : defaultSortField;

  const sortDirection = query.sortOrder === "desc" ? -1 : 1;

  const sortQuery = { [sortField as string]: sortDirection } as Record<
    string,
    SortOrder
  >;
  // console.log(sortQuery, "dasd");

  excludedQueries.forEach((el) => delete copyQueries[el]);

  let search = "";
  let filter = "";
  const queryObject: Record<string, unknown> = {};

  if (query.search) {
    search = query.search as string;
  }
  if (query.filter) {
    filter = query.filter as string;
  }

  if (search) {
    queryObject.$or = SearchFields.map((fields) => ({
      [fields]: { $regex: search, $options: "i" },
    }));
  }
  if (filter) {
    queryObject.author = new ObjectId(filter);
  }

  const final =
    Object.keys(queryObject).length > 0
      ? BlogModel.find(queryObject)
      : BlogModel.find();

  const result = await final.sort(sortQuery).populate("author");

  // const result2 = await result.find().sort(sortQuery);
  return result;
};

export const blogService = {
  postBloginDb,
  updateBloginDb,
  getBloginDb,
  deleteFromDb,
  getAllBlogFromDb,
};
