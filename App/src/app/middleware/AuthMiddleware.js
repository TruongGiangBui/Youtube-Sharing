

require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { logger } = require('../../services/Logger')
module.exports = {
    cors(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    },
    authorize(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (token == null) return res.sendStatus(401); // if do not have token return error

            // Xác thực và giải mã token
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if (err) return res.sendStatus(401); // Invalid TOken
                req.user = user; // Save userinfo to request
                next();
            });
        } catch (err) {
            logger.log('error', 'authorize error: ', err)
            return res.status(500).send({
                message: "Server Error"
            })
        }
    },

}