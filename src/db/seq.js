/**
 * @description sequelize实例
 * @author WN
 */

const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../conf/db');
const { isTest } = require('../utils/env');

const { host, user, password, database } = MYSQL_CONF;
const conf = {
    host,
    dialect: 'mysql'
}
if(isTest){
    conf.logging= () => {}
}

//线上环境使用连接池
conf.pool = {
    max: 5,//最大连接数
    min: 0,
    idle: 10000 //ms
}

const seq = new Sequelize(database, user, password, conf);
module.exports = seq;