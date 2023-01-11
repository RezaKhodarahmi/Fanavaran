const express = require("express");
require("dotenv").config();
const app = express();
const userRouter = require("./api/user/user.router");
const dashboardUserRouter = require("./api/dashboard/user/user.router");
const dashboardUserMetaRouter = require("./api/dashboard/usermeta/userMeta.router");
const dashboardCourseRouter = require("./api/dashboard/course/courses.router");
const dashboardPostRouter = require("./api/dashboard/posts/post.router");
const dashboardBlogCategoryRouter = require("./api/dashboard/posts/category.route");
const dashboardTagsRouter = require("./api/dashboard/posts/tag.router");
const dashboardCategoryRouter = require("./api/dashboard/category/category.router");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
//Client
app.use("/api/users", userRouter);

app.use("/uploads", express.static("uploads"));
//Dashboard
app.use("/api/dashboard/users", dashboardUserRouter);
app.use("/api/dashboard/users", dashboardUserMetaRouter);
app.use("/api/dashboard/courses", dashboardCourseRouter);
app.use("/api/dashboard/posts", dashboardPostRouter);
app.use("/api/dashboard/posts/category", dashboardBlogCategoryRouter);
app.use("/api/dashboard/posts/tags", dashboardTagsRouter);
app.use("/api/dashboard/category", dashboardCategoryRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port:${process.env.APP_PORT}`);
});
