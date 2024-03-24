const express = require("express")
const userRoute = require("./routes/user.js");
const dbConnection = require("./utils/db.js");
const postRoute = require("./routes/blog.js");

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());

(async () => {
    try {
        const connection = await dbConnection()
        if (connection) {
            global.dbConn = connection;
            app.use("/user", userRoute)
            app.use("/blog", postRoute)
            app.listen(PORT, async () => {
                console.log(`Node running in ${PORT}`);
                require("./schema/blog.js")
                require("./schema/user.js")
                require("./schema/comment.js")
                require("./schema/replies.js")
            })
        }
    } catch (error) {
        console.log(`Server error - ${error}`);
    }
})()




