
const Mock = require('mockjs');


Mock.mock('/api/userInfo', 'post', require('./json/userInfo'))