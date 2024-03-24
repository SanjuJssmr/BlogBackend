(async () => {
    const schema = `
    CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        password VARCHAR(255),
        mobile VARCHAR(255)
    )`;

    await dbConn.query(schema)
})()

