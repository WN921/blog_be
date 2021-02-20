/**
 * @description user数据格式校验
 */
const  _validate = require('./_validate');
const schema = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            pattern: '^[a-zA-z][a-zA-Z0-9_]+$',//字母开头，字母数字下划线
            maxLength: 255,
            minLength: 2
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        newPassword: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        nickName: {
            type: 'string',
            maxLength: 255,
        },
        picture: {
            type: 'string',
            maxLength: 255,
        },
        city: {
            type: 'string',
            maxLength: 255,
            minLength: 2
        },
        gender: {
            type: 'number',
            minimum: 1,
            maximun: 3
        }
    }
}

//执行检验
/**
 * 特定的用于校验user数据的校验函数
 * @param {Object} data 用户数据
 */
function userValidate(data = {}){
    return _validate(schema, data);
}

module.exports = userValidate;