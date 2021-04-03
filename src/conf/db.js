/**
 *  @description 存储配置
 *  @authro WN
 */

const { isProd } = require('../utils/env');

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}
let MYSQL_CONF = {
    host: 'localhost',
    user: 'koa2_blog_db',
    password: '1244',
    post: '3306',
    database: 'koa2_blog_db'
}
if (isProd) {
    REDIS_CONF = {
        //线上的redis配置
        port: 6379,
        host: '127.0.0.1'
    },
    MYSQL_CONF = {
        host: 'localhost',
        user: 'koa2_blog_db',
        password: '1244',
        post: '3306',
        database: 'koa2_blog_db'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}
