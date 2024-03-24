(async () => {
    const schema = `
    CREATE TABLE IF NOT EXISTS blogs(
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        title VARCHAR(255),
        content VARCHAR(255),
        image LONGBLOB,
        tags JSON,
        FOREIGN KEY (userId) REFERENCES users(id)
    )`;

    await dbConn.query(schema)
})()


