const db = require("../utils/dbQuery");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const userData = req.body;
        let checkExist, status;
        if (Object.keys(userData).length === 0) {
            
            return res.send({status:0, response:"Invalid request"})
        }
        checkExist = await db.findOne("users", "email", userData.email)
        if (checkExist != null) {

            return res.send({ status: 0, response: "Email already exist" })
        }
        userData.password = await bcrypt.hash(userData.password, 10)
        status = await db.insertOne("users", userData)
        if (status === true) {

            return res.send({ status: 1, response: "Registration success" })

        }
        return res.send({ status: 0, response: "Something went wrong" })

    } catch (error) {
        return res.send({ status: 0, response: `Error in registration controller - ${error}` })
    }
}

const login = async (req, res) => {
    try {
        const userData = req.body;
        let checkExist, checkPass, token;
        if (Object.keys(userData).length === 0) {

            return res.send({ status: 0, response: "Invalid request" })
        }
        checkExist = await db.findOne("users", "email", userData.email)
        if (checkExist == null) {

            return res.send({ status: 0, response: "Invalid credentials" })
        }
        checkPass = await bcrypt.compare(userData.password, checkExist.password)
        if (checkPass === false) {

            return res.send({ status: 0, response: "Invalid credentials" })
        }
        token = jwt.sign({ userId: checkExist.id, email: checkExist.email }, "JSSMR", { expiresIn: "2h" })
        if (token) {

            return res.send({ status: 1, response: "login success", token: token })
        }

        return res.send({ status: 0, response: "Something went wrong" })
    } catch (error) {
        return res.send({ status: 0, response: `Error in login controller - ${error}` })
    }
}

module.exports = { register, login }