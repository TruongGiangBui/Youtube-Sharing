require('dotenv').config();
const mongoose = require('mongoose');
const {logger}=require('./Logger')
async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName:"youtube_share"
    });
    logger.log('debug','Connected succesfully');
  } catch (error) {
    logger.log('debug','Connect failure',error);
  }
}
module.exports = { connect };