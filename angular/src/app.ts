'use strict'

declare var angular:any;

var rohapp = angular.module('rohapp',['ngRoute']);

//Directives
import NavBar = require('./directives/navbar/navbar');
import MediaList = require('./directives/medialist/medialist');
import MediaObject = require('./directives/mediaobject/mediaobject');


import RouteConfig = require('./routes');
import socketIOService = require('./services/socketIOService');


export = rohapp;

rohapp.config(['$routeProvider', RouteConfig]);
rohapp.service('socketIOService', socketIOService);
rohapp.directive('navbar', [NavBar]);
rohapp.directive('mediaobject', [MediaObject]);
rohapp.directive('medialist', ['socketIOService', MediaList]);
