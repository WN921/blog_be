/**
 * @description 数据模型入口文件
 */

const User = require('./User');
const Blog = require('./Blog');
const Label = require('./Label');

User.hasMany(Blog);
Blog.belongsTo(User);
Label.belongsToMany(Blog, { through: 'BlogLabels' });
Blog.belongsToMany(Label, { through: 'BlogLabels' });

module.exports = {
    User,
    Blog,
    Label
}