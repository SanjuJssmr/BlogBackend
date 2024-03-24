const insertOne = async (table, data) => {
    try {
        const [results] = await dbConn.query(`INSERT INTO ${table} SET ?`, data)
        if (results.affectedRows === 1, results.serverStatus === 2) {
            return true
        }
        return false;
    } catch (error) {
        return console.log(`Error in dbQuery,insertOne - ${error}`);
    }
};

const findOne = async (table, field, value) => {
    try {
        const results = await dbConn.execute(`SELECT * FROM ${table} WHERE ${field} = '${value}' LIMIT 1`)
        if (results != undefined && results.length !== 0) {
            if (results[0].length != 0) {
                return results[0][0];
            }
        }
        return null;
    } catch (error) {
        return console.log(`Error in dbQuery,insertOne - ${error}`);
    }
};

const findById = async (table, id) => {
    try {
        const results = await dbConn.execute(`SELECT * FROM ${table} WHERE id = ${id}`)
        if (results != undefined && results.length !== 0) {
            if (results[0].length != 0) {
                return results[0][0];
            }
        }
        return null;
    } catch (error) {
        return console.log(`Error in dbQuery,insertOne - ${error}`);
    }
};

const joinById = async (tableOne, tableTwo, fk, pk, id, fields) => {
    try {
        const results = await dbConn.execute(`SELECT ${fields} FROM ${tableOne} JOIN ${tableTwo} ON ${tableOne}.${fk} = ${tableTwo}.${pk} WHERE ${tableTwo}.${pk} = ${id}`)
        if (results != undefined && results.length !== 0) {
            if (results[0].length != 0) {
                return results[0];
            }
        }
        return null;
    } catch (error) {
        return console.log(`Error in dbQuery,insertOne - ${error}`);
    }
}

const joinTwoTable = async (tableOne, tableTwo, fk, pk, fields) => {
    try {
        const results = await dbConn.execute(`SELECT ${fields} FROM ${tableOne} JOIN ${tableTwo} ON ${tableOne}.${fk} = ${tableTwo}.${pk}`)
        if (results != undefined && results.length !== 0) {
            if (results[0].length != 0) {
                return results[0];
            }
        }
        return null;
    } catch (error) {
        return console.log(`Error in dbQuery,insertOne - ${error}`);
    }
}

const complexAggregation = async (query) => {
    try {
        const results = await dbConn.execute(query)
        if (results != undefined && results.length !== 0) {
            if (results[0].length != 0) {
                return results[0];
            }
        }
        return null;
    } catch (error) {
        return console.log(`Error in dbQuery,insertOne - ${error}`);
    }
}

const deleteParentAndChild = async (childQueries, parentQuery) => {
    try {
        await pool.beginTransaction();
        for (const query of childQueries) {
            await pool.execute(query)
        }
        const results = await pool.execute(parentQuery)
        if (results != undefined && results.length !== 0) {
            if (results[0].length != 0) {
                if (results[0].affectedRows !== 0) {
                    await pool.commit();
                    await pool.release();
                    return true;
                }
            }
        }
        await pool.rollback();
        return false;
    } catch (error) {
        await pool.rollback();
        return console.log(`Error in dbQuery,insertOne - ${error}`);
    }
}

const deleteOne = async (query) => {
    try {
        await pool.beginTransaction();
        const results = await pool.execute(query)
        if (results != undefined && results.length !== 0) {
            if (results[0].length != 0) {
                if (results[0].affectedRows !== 0) {
                    await pool.commit();
                    await pool.release();
                    return true;
                }
            }
        }
        await pool.rollback();
        return false;
    } catch (error) {
        await pool.rollback();
        return console.log(`Error in dbQuery,insertOne - ${error}`);
    }
}

module.exports = {
    insertOne,
    findOne,
    findById,
    joinById,
    joinTwoTable,
    complexAggregation,
    deleteParentAndChild,
    deleteOne
}

