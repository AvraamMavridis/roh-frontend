'use strict';

var Reflux = require('reflux');

var NewsActions = Reflux.createActions(['newsUpdate','requestNews','expandArticle']);

module.exports = NewsActions;
