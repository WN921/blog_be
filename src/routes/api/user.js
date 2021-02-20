/**
 * @description user相关api，这里只进行格式校验（scheme，待添加）和转发
 * @author WN
 */

const router = require('koa-router')();
const { insertUser, login, delteCurUser } = require('../../controller/user');
const genValidator = require('../../middlerwares/validator');
const userValidate  = require('../../validator/user');
const { isTest } = require('../../utils/env');
const loginCheck = require('../../middlerwares/loginCheck');
router.prefix('/api/user');

//增加用户
router.post('/', genValidator(userValidate), async(ctx, next) => {
    const { userName, password, gender } = ctx.request.body;
    ctx.body = await insertUser({userName, password, gender});
})

//登录
router.post('/login', async(ctx, next) => {
    const { userName, password } = ctx.request.body;
    //controller
    ctx.body = await login(ctx, userName, password);
})

//删除
router.delete('/', loginCheck, async(ctx, next) => {
    //只支持测试环境下使用
    if(isTest){
        //只支持删除登陆状态下删除自己
        const { userName } = ctx.session.userInfo;
        //调用controller
        ctx.body = await delteCurUser(userName);
    }
})

module.exports = router;