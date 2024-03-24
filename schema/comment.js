(async () => {
    const schema = `
    CREATE TABLE IF NOT EXISTS comments(
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        blogId INt,
        message VARCHAR(255),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (blogId) REFERENCES blogs(id)
    )`;
    await dbConn.query(schema)
})()