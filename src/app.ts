import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { Userrouter } from "./app/modules/User/user.route";
import { Blogrouter } from "./app/modules/Blogs/blog.route";
import authRoute from "./app/modules/auth/auth.route";
import globalErrorHandler from "./app/modules/middlewares/globalErrorHandler";
import notFound from "./app/modules/middlewares/Notfound";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api", Userrouter);
app.use("/api", Blogrouter);
app.get("/", (req: Request, res: Response) => {
  res.send("HELLO BLOGGER");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
