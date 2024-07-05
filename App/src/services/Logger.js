const log4js = require('log4js');
log4js.configure({
    appenders: {
        app: { type: 'dateFile', filename: "logs/app.log" },
        console: { type: 'console' }
    },
    categories: {
        app: { appenders: ['app', 'console'], level: 'debug' },
        another: { appenders: ['console'], level: 'debug' },
        default: { appenders: ['console'], level: 'debug' }
    }
});
let logger = log4js.getLogger('app');
logger.level = "debug";


module.exports = { logger }