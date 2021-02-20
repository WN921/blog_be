/**
 * @description jest server
 * @author wn
 */

 const request = require('supertest');
 const server = require('../src/app').listen(3001);

 module.exports = request(server);