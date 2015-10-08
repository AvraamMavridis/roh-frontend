'use strict';

let Reflux = require('reflux');

let FacebookActions = Reflux.createActions(['getUserDetails', 'getLoginStatus', 'statusChange']);

module.exports = FacebookActions
