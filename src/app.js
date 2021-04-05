const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const koaBody = require('koa-body');
const serve = require('koa-static');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const { SESSION_SECRET_KEY } = require('./conf/secretKeys');
const redisStore = require('koa-redis');
const path = require('path');
const { REDIS_CONF } = require('./conf/db');
const user = require('./routes/api/user');
const blog = require('./routes/api/blog');
const label = require('./routes/api/label');
const util = require('./routes/api/util');
const CORS = require('./middlerwares/CORS');
const { DIST_IMAGE_PATH } = require('./conf/constant');

// error handler
onerror(app);

// global middlewares
app.use(koaBody(
    {
        multipart: true,
        formidable: {
            maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
        }
    }
));
app.use(json());
app.use(logger());

app.use(serve(DIST_IMAGE_PATH));

//跨域请求处理
app.use(CORS);

//调用session中间件
app.keys = [SESSION_SECRET_KEY];
app.use(
    session({
        key: 'blog.sid',
        prefix: 'blog.sess', //redis key的前戳，默认是koa:sess
        store: redisStore({
            all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
        }),
        // cookie: {
        //     path: '/',
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000 ,//one day in ms,
        //     overwrite: true,
        //     signed: true,
        //     sameSite: "strict"
        //   }
    })
);

// routes definition
app.use(user.routes(), user.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());
app.use(label.routes(), label.allowedMethods());
app.use(util.routes(), util.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
