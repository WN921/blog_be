/**
 * @description 博客数据模型
 */

const seq = require('../seq');
const { STRING, DECIMAL, TEXT, INTEGER} = require('../type');

//Users
const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '写博客的用户的ID'
    },
    title: {
        type: STRING,
        allowNull: false,
        comment: '博客的标题'
    },
    abstract: {
        type: TEXT,
        allowNull: false,
        comment: '博客的摘要'
    },
    MDFilePath: {
        type: STRING,
        allowNull: false,
        comment: '博客文件的本机地址'
    }
})

module.exports = Blog;