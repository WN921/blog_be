/**
 * @description 标签数据模型
 */

const seq = require('../seq');
const { STRING, DECIMAL} = require('../type');

//Labels
const Label = seq.define('label', {
    labelName: {
        type: STRING,
        allowNull: false,
        comment: '标签名'
    },
    color: {
        type: STRING,
        allowNull: false,
        comment: '标签的颜色，允许为空则web端自行定义颜色'
    },

})

module.exports = Label;