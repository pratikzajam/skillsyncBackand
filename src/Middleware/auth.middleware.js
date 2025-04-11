import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


import 'dotenv/config'

export let auth = async (req, res, next) => {
    try {

        let headers = req.headers.authorization.split(" ")
        let authToken = headers[1]

        if (!authToken) {
            return res.json({
                status: false,
                message: "No token is found",
                data: null
            })
        } else {
            const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
            console.log(decoded, "decoded");

            req.user = decoded

            console.log(req.user)

            next()
        }

    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
            data: null
        })
    }
}