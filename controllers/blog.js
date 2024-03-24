const db = require("../utils/dbQuery")

const createBlog = async (req, res) => {
    try {
        const userData = req.body;
        let checkExist, status;
        if (Object.keys(userData).length === 0) {

            return res.send({ status: 0, response: "Invalid request" })
        }
        checkExist = await db.findById("users", userData.userId)
        if (checkExist == null) {

            return res.send({ status: 0, response: "Unauthorized" })
        }
        userData.userId = checkExist.id
        userData.tags = JSON.stringify(userData.tags)
        status = await db.insertOne("blogs", userData)
        if (status === true) {

            return res.send({ status: 1, response: "Blog added successfully" })

        }
        return res.send({ status: 0, response: "Something went wrong" })

    } catch (error) {
        return res.send({ status: 0, response: `Error in blog controller - ${error}` })
    }
}

const getMyBlogs = async (req, res) => {
    try {
        const userData = req.body;
        let checkExist, getMyBlog;
        if (Object.keys(userData).length === 0) {

            return res.send({ status: 0, response: "Invalid request" })
        }
        checkExist = await db.findById("users", userData.userId)
        if (checkExist == null) {

            return res.send({ status: 0, response: "Unauthorized" })
        }
        getMyBlog = await db.joinById("blogs", "users", "userId", "id", userData.userId, "title, tags, name, email, content")
        if (getMyBlog != undefined) {

            return res.send({ status: 1, data: getMyBlog })

        }
        return res.send({ status: 0, response: "Something went wrong" })

    } catch (error) {
        return res.send({ status: 0, response: `Error in blog controller - ${error}` })
    }
}

const getAllBlogs = async (req, res) => {
    try {
        let getMyBlog;
        getMyBlog = await db.joinTwoTable("blogs", "users", "userId", "id", "title, tags, name, email, content")
        if (getMyBlog != undefined) {

            return res.send({ status: 1, data: getMyBlog })

        }
        return res.send({ status: 0, response: "Something went wrong" })
    } catch (error) {
        return res.send({ status: 0, response: `Error in blog controller - ${error}` })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const blogData = req.body;
        let checkBlogExist, status, childQueries, deleteReplyQuery, deleteCommentQuery, deleteBlogQuery;
        if (Object.keys(blogData).length === 0) {

            return res.send({ status: 0, response: "Invalid request" })
        }
        checkBlogExist = await db.findById("blogs", blogData.blogId)
        if (checkBlogExist == null) {

            return res.send({ status: 0, response: "No blogs found" })
        }
        deleteReplyQuery = `DELETE FROM replies WHERE blogId = ${blogData.blogId};`
        deleteCommentQuery = `DELETE FROM comments WHERE blogId = ${blogData.blogId};`
        childQueries = [deleteReplyQuery, deleteCommentQuery];
        deleteBlogQuery = `DELETE FROM blogs WHERE id = ${blogData.blogId} AND userId = ${blogData.userId};`
        status = await db.deleteParentAndChild(childQueries, deleteBlogQuery)
        if (status === true) {

            return res.send({ status: 1, response: "Blog deleted successfully" })

        }
        return res.send({ status: 0, response: "Can't complete the action" })

    } catch (error) {
        return res.send({ status: 0, response: `Error in blog controller - ${error}` })
    }
}

const addComment = async (req, res) => {
    try {
        const commentData = req.body;
        let checkUserExist, checkBlogExist, status;
        if (Object.keys(commentData).length === 0) {

            return res.send({ status: 0, response: "Invalid request" })
        }
        checkUserExist = await db.findById("users", commentData.userId)
        if (checkUserExist == null) {

            return res.send({ status: 0, response: "Unauthorized" })
        }
        checkBlogExist = await db.findById("blogs", commentData.blogId)
        if (checkBlogExist == null) {

            return res.send({ status: 0, response: "Unauthorized" })
        }
        commentData.userId = checkUserExist.id
        commentData.blogId = checkBlogExist.id
        status = await db.insertOne("comments", commentData)
        if (status === true) {

            return res.send({ status: 1, response: "Comment added successfully" })

        }
        return res.send({ status: 0, response: "Something went wrong" })

    } catch (error) {
        return res.send({ status: 0, response: `Error in blog controller - ${error}` })
    }
}

const deleteComment = async (req, res) => {
    try {
        const commentData = req.body;
        let checkCommentExist, status, childQueries, deleteReplyQuery, deleteCommentQuery;
        if (Object.keys(commentData).length === 0) {

            return res.send({ status: 0, response: "Invalid request" })
        }
        checkCommentExist = await db.findById("comments", commentData.commentId)
        if (checkCommentExist == null) {

            return res.send({ status: 0, response: "No comment found" })
        }
        deleteReplyQuery = `DELETE FROM replies WHERE replies.commentId = ${commentData.commentId};`
        childQueries = [deleteReplyQuery]
        deleteCommentQuery = `DELETE FROM comments WHERE id = ${commentData.commentId} AND userId = ${commentData.userId};`
        status = await db.deleteParentAndChild(childQueries, deleteCommentQuery)
        if (status === true) {

            return res.send({ status: 1, response: "Comment deleted successfully" })

        }
        return res.send({ status: 0, response: "Can't complete the action" })

    } catch (error) {
        return res.send({ status: 0, response: `Error in blog controller - ${error}` })
    }
}

const addReply = async (req, res) => {
    try {
        const replyData = req.body;
        let checkUserExist, checkBlogExist, checkCommentExist, status;
        if (Object.keys(replyData).length === 0) {

            return res.send({ status: 0, response: "Invalid request" })
        }
        checkUserExist = await db.findById("users", replyData.userId)
        if (checkUserExist == null) {

            return res.send({ status: 0, response: "Unauthorized" })
        }
        checkBlogExist = await db.findById("blogs", replyData.blogId)
        if (checkBlogExist == null) {

            return res.send({ status: 0, response: "No blog found" })
        }
        checkCommentExist = await db.findById("comments", replyData.commentId)
        if (checkCommentExist == null) {

            return res.send({ status: 0, response: "No comment found" })
        }
        replyData.userId = checkUserExist.id
        replyData.blogId = checkBlogExist.id
        replyData.commentId = checkCommentExist.id
        status = await db.insertOne("replies", replyData)
        if (status === true) {

            return res.send({ status: 1, response: "Reply added successfully" })

        }
        return res.send({ status: 0, response: "Something went wrong" })

    } catch (error) {
        return res.send({ status: 0, response: `Error in blog controller - ${error}` })
    }
}

const deleteReply = async (req, res) => {
    try {
        const replyData = req.body;
        let checkReplyExist, status, deleteReplyQuery;
        if (Object.keys(replyData).length === 0) {

            return res.send({ status: 0, response: "Invalid request" })
        }
        checkReplyExist = await db.findById("replies", replyData.replyId)
        if (checkReplyExist == null) {

            return res.send({ status: 0, response: "No reply found" })
        }
        deleteReplyQuery = `DELETE FROM replies WHERE replies.commentId = ${replyData.replyId} AND replies.userId = ${replyData.userId};`
        status = await db.deleteOne(deleteReplyQuery)
        if (status === true) {

            return res.send({ status: 1, response: "Reply deleted successfully" })

        }
        return res.send({ status: 0, response: "Can't complete the action" })

    } catch (error) {
        return res.send({ status: 0, response: `Error in blog controller - ${error}` })
    }
}

const getBlogComments = async (req, res) => {
    try {
        const blogData = req.body;
        let checkBlogExist, getBlogComment;
        if (Object.keys(blogData).length === 0) {

            return res.send({ status: 0, response: "Invalid request" })
        }
        checkBlogExist = await db.findById("blogs", blogData.blogId)
        if (checkBlogExist == null) {

            return res.send({ status: 0, response: "No post found" })
        }
        getBlogComment = await db.complexAggregation(`SELECT 
        title, 
        content,
        IFNULL(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'message',comments.message,
                    'date', comments.date,
                    'name',users.name,
                    'email',users.email
                )
            ), 
            JSON_ARRAY()
        )
        AS commentInfo
        FROM blogs 
        JOIN comments ON blogs.id = comments.blogId
        JOIN users ON blogs.userId = users.id
        WHERE comments.blogId = ${blogData.blogId}
        `
        )
        if (getBlogComment != undefined) {

            return res.send({ status: 1, data: getBlogComment[0].commentInfo, totalComments: getBlogComment[0].commentInfo.length })
        }

        return res.send({ status: 0, response: "Something went wrong" })
    } catch (error) {
        return res.send({ status: 0, response: `Error in blog controller - ${error}` })
    }
}

const getCommentReplies = async (req, res) => {
    try {
        const commentData = req.body;
        let checkBlogExist, checkCommentExist, getReplies;
        if (Object.keys(commentData).length === 0) {

            return res.send({ status: 0, response: "Invalid request" })
        }
        checkBlogExist = await db.findById("blogs", commentData.blogId)
        if (checkBlogExist == null) {

            return res.send({ status: 0, response: "No post found" })
        }
        checkCommentExist = await db.findById("comments", commentData.commentId)
        if (checkCommentExist == null) {

            return res.send({ status: 0, response: "No comment found" })
        }
        getReplies = await db.complexAggregation(`SELECT 
        comments.message, 
        comments.date,
        IFNULL(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'message',replies.message,
                    'date', replies.date,
                    'name',users.name,
                    'email',users.email
                )
            ), 
            JSON_ARRAY()
        )
        AS repliesInfo
        FROM comments 
        JOIN replies ON comments.id = replies.commentId
        JOIN users ON replies.userId = users.id
        WHERE comments.id = ${commentData.commentId};
        `
        )
        if (getReplies != undefined) {

            return res.send({ status: 1, data: getReplies[0].repliesInfo, totalCount: getReplies[0].repliesInfo.length })
        }

        return res.send({ status: 0, response: "Something went wrong" })
    } catch (error) {
        return res.send({ status: 0, response: `Error in blog controller - ${error}` })
    }
}

module.exports = {
    createBlog,
    getMyBlogs,
    getAllBlogs,
    getAllBlogs,
    addComment,
    getBlogComments,
    addReply,
    getCommentReplies,
    deleteComment,
    deleteReply,
    deleteBlog
}