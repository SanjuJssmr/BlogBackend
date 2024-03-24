const express = require("express");
const { createBlog, getMyBlogs, getAllBlogs, addComment, getBlogComments, addReply, getCommentReplies, deleteComment, deleteReply, deleteBlog } = require("../controllers/blog");
const postRoute = express.Router();

postRoute.post("/insertBlog", createBlog)
postRoute.post("/getMyBlogs", getMyBlogs)
postRoute.get("/getAllBlogs", getAllBlogs)
postRoute.delete("/deleteBlog", deleteBlog)
postRoute.post("/addComment", addComment)
postRoute.delete("/deleteComment", deleteComment)
postRoute.post("/addReply", addReply)
postRoute.delete("/deleteReply", deleteReply)
postRoute.post("/getBlogComments", getBlogComments)
postRoute.post("/getCommentReplies", getCommentReplies)

module.exports = postRoute;