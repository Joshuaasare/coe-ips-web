/*
 * @Author: Joshua Asare
 * @Date: 2019-11-15 11:53:10
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-11-15 12:02:16
 */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./store.prod');
} else {
  module.exports = require('./store.dev');
}
