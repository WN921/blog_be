/**
 * @description schema校验
 */

const ajv = require('ajv')();

/**
 * json schema校验函数，使用指定json scheme规则堆数据进行校验
 * @param {Object} schema   json schema 规则
 * @param {Object} data   代校验数据 
 */
function _validate(schema, data = {}){
    const valid = ajv.validate(schema, data);
    if(!valid){
        return ajv.errors[0];
    }
}

module.exports = _validate;
