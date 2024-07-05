
require('dotenv').config();
const Post = require('../models/Post');
const { logger } = require('../../services/Logger')


class PostController {


    async shareVideo(req, res, next) {
        try {
            let data = req.body
            for (let key of ['videoId','title','thumbnail']) {
                if (!req.body[key]) {
                    return res.status(400).send({
                        message: key + ' is required'
                    });
                }
            }
            logger.log('debug', "user", req.user)
            let post = new Post({
                videoId: req.body.videoId,
                title: req.body.title,
                description: req.body.description,
                thumbnail: req.body.thumbnail,
                userId: req.user.id,
                email: req.user.email,
            })
            post.save()
            global.io.emit(`notification`, post);
            return res.status(200).send({
                message: "Successfully",
            })
        } catch (err) {
            logger.log('error', 'shareVideo error: ', err)
            return res.status(500).send({
                message: "Server Error"
            })
        }
    }
    async getNewFeed(req, res, next) {
        try {
            let frompost=req.query.frompost?Number(req.query.frompost):0;
            let posts= await Post.find().sort({ updatedAt: -1 }).skip(frompost).limit(10);
            return res.status(200).send({
                message: "Successfully",
                data:posts
            })
        } catch (err) {
            logger.log('error', 'getNewFeed error: ', err)
            return res.status(500).send({
                message: "Server Error"
            })
        }
    }
    async getNotification(req, res, next) {
        try {
            let posts= await Post.find().sort({ updatedAt: -1 }).limit(10);
            return res.status(200).send({
                message: "Successfully",
                data:posts
            })
        } catch (err) {
            logger.log('error', 'getNotification error: ', err)
            return res.status(500).send({
                message: "Server Error"
            })
        }
    }
}
module.exports = new PostController();
