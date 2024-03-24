(async () => {
    const schema = `
    CREATE TABLE IF NOT EXISTS replies(
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        blogId INt,
        commentId INT,
        message VARCHAR(255),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (blogId) REFERENCES blogs(id),
        FOREIGN KEY (commentId) REFERENCES comments(id)
    )`;
    await dbConn.query(schema)
})()