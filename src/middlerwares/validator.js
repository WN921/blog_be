/**
 * @description 用于生成json scheme验证中间件的生成器
 */
const { ErrorModel } = require('../model/ResModel');
/**
 * 生成json schema 验证的中间件
 * @param {function} validateFn 具体的校验函数 
 */
function genValidator(validateFn){
    //定义中间件函数
    async function validator(ctx, next){
        const data = ctx.request.body;
        const error = validateFn(data);
        if(error){
            //验证失败，这里需要将详细错误信息返回给前端
            ctx.body = new ErrorModel({
                errno: -1,
                message: error
            });
            return;
        }
        //成功则继续执行中间件
        await next();
    }
    //返回中间件
    return validator;
}

module.exports = genValidator;