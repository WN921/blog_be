/**
 * @description 环境变量监测相关方法
 * @author WN
 */

const ENV = process.env.NODE_ENV;

module.exports = {
    isDev: ENV === 'dev',
    isProd: ENV === 'production',
    isTest: ENV === 'test',
}