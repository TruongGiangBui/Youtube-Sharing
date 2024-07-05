

const log4js = require('log4js');
require('dotenv').config();
const User = require('../models/User');
const { logger } = require('../../services/Logger')
const md5 = require('md5')
const jwt = require('jsonwebtoken');
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
class AuthController {


    async register(req, res, next) {
        let data = req.body
        try {


            for (let key of ['email', 'password']) {
                if (!req.body[key]) {
                    return res.status(400).send({
                        message: key + ' is required'
                    });
                }
            }
            if (!(validateEmail(req.body.email))) {
                return res.status(400).send({
                    message: "Email is not valid"
                });
            }
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).send({
                    message: "Email is exist"
                });
            } else {
                user = new User({ email: req.body.email, password: md5(req.body.password) })
                user.save()
                return res.status(200).send({
                    message: "User created successfully"
                })
            }
        } catch (err) {
            logger.log('error', 'register error: ', err)
            return res.status(500).send({
                message: "Server Error"
            })
        }
    }
    async login(req, res, next) {
        try {
            for (let key of ['email', 'password']) {
                if (!req.body[key]) {
                    return res.status(400).send({
                        message: key + ' is required'
                    });
                }
            }
            if (!(validateEmail(req.body.email))) {
                return res.status(400).send({
                    message: "Email is not valid"
                });
            }
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                if (user.password == md5(req.body.password)) {
                    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
                    return res.status(200).send({
                        message: "Login successfully",
                        accessToken: token
                    })
                } else {
                    return res.status(401).send({
                        message: "Password is not valid"
                    });
                }
            } else {
                return res.status(401).send({
                    message: "User is not exist"
                });
            }
        } catch (err) {
            logger.log('error', 'login error: ', err)
            return res.status(500).send({
                message: "Server Error"
            })
        }
    }
}
module.exports = new AuthController();
