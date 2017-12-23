(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["moonSugar"] = factory();
	else
		root["moonSugar"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(1);
var documentSize = __webpack_require__(2);

var flakes = [];
var deletedFlakes = [];
var updateParams = {};
var root = void 0;
var rafUpdate = void 0;
var rafGenerate = void 0;
var documentWidth = void 0;
var documentHeight = void 0;
var classNameSnowflow = void 0;
var countFlakesInSecons = void 0;
var countFlakeTypes = void 0;

var init = exports.init = function init() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    switch (_typeof(options.element)) {
        case "object":
            root = options.element;
            break;
        case "string":
            root = document.querySelector(options.element);
            break;
        default:
            root = document.querySelector(".moonSugar");
    }

    classNameSnowflow = options.classNameSnowflow || "moonSugar-item";
    countFlakesInSecons = options.countFlakesInSecons || 5;
    countFlakeTypes = options.countFlakeTypes || 1;

    documentWidth = documentSize.width();
    documentHeight = documentSize.height();

    root.style.width = documentWidth + 'px';
    root.style.height = documentHeight + 'px';

    window.onresize = function () {
        root.style.width = 'auto';
        root.style.height = 'auto';

        documentWidth = documentSize.width();
        documentHeight = documentSize.height();

        root.style.width = documentWidth + 'px';
        root.style.height = documentHeight + 'px';
    };

    startGenerate(countFlakesInSecons);

    update();
};

var startGenerate = function startGenerate(fps) {
    updateParams.fpsInterval = 1000 / fps;
    updateParams.then = Date.now();
    updateParams.startTime = updateParams.then;

    generate();
};

var generate = function generate() {
    rafGenerate = requestAnimationFrame(generate);

    updateParams.now = Date.now();
    updateParams.elapsed = updateParams.now - updateParams.then;

    if (updateParams.elapsed > updateParams.fpsInterval) {
        updateParams.then = updateParams.now - updateParams.elapsed % updateParams.fpsInterval;

        if (deletedFlakes.length) {
            flakes[deletedFlakes[0]] = _extends({}, flakes[deletedFlakes[0]], {
                active: true,
                x: Math.floor(Math.random() * documentWidth),
                y: 0,
                vx: (Math.random() - 0.5) * 5,
                vy: 2 + Math.random() * 2,
                dx: 2 + Math.random(),
                counter: 0,
                coef: (Math.random() * (0.1 - 0.05) + 0.05) / 2
            });
            deletedFlakes.shift();
        } else {
            var newFlake = {
                active: true,
                x: Math.floor(Math.random() * documentWidth),
                y: 0,
                vx: (Math.random() - 0.5) * 5,
                vy: 2 + Math.random() * 2,
                dx: 2 + Math.random(),
                counter: 0,
                coef: (Math.random() * (0.1 - 0.05) + 0.05) / 2
            };

            root.insertAdjacentHTML('beforeend', '<div class="' + classNameSnowflow + '" data-type="' + Math.floor(Math.random() * countFlakeTypes) + '" style="transform: (' + Math.round(newFlake.x) + 'px, ' + Math.round(newFlake.y) + 'px)"></div>');

            newFlake.DOM = root.lastElementChild;

            flakes.push(newFlake);
        }
    }
};

var update = function update() {
    flakes.forEach(function (element, index) {
        if (element.active && Math.random() > 0.2) {
            element.y += element.vy;
            element.counter++;

            if (element.y > documentHeight + 30) {
                element.active = false;
                deletedFlakes.push(index);
            } else {
                element.x += element.vx + Math.cos(element.counter * element.coef) * element.dx;
                if (element.x > -30 && element.x < documentWidth + 30) {
                    element.DOM.style.transform = 'translate(' + element.x + 'px, ' + element.y + 'px)';
                }
            }
        }
    });

    rafUpdate = requestAnimationFrame(update);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * requestAnimationFrame polyfill v1.0.1
 * requires Date.now
 *
 * © Polyfiller 2015
 * Released under the MIT license
 * github.com/Polyfiller/requestAnimationFrame
 */
window.requestAnimationFrame || function () {

    'use strict';

    window.requestAnimationFrame = window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function () {

        var fps = 60;
        var delay = 1000 / fps;
        var animationStartTime = Date.now();
        var previousCallTime = animationStartTime;

        return function requestAnimationFrame(callback) {

            var requestTime = Date.now();
            var timeout = Math.max(0, delay - (requestTime - previousCallTime));
            var timeToCall = requestTime + timeout;

            previousCallTime = timeToCall;

            return window.setTimeout(function onAnimationFrame() {

                callback(timeToCall - animationStartTime);
            }, timeout);
        };
    }();

    window.cancelAnimationFrame = window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || function cancelAnimationFrame(id) {
        window.clearTimeout(id);
    };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */

var doc = document;
var body = doc.body;
var elem = doc.documentElement;

/**
 * Get the height of the document.
 *
 * @return {integer}
 *
 * @api public
 */

function getHeight() {
  return Math.max(body.scrollHeight, elem.scrollHeight, body.offsetHeight, elem.offsetHeight, body.clientHeight, elem.clientHeight);
}

/**
 * Get the width of the document.
 *
 * @return {integer}
 *
 * @api public
 */

function getWidth() {
  return Math.max(body.scrollWidth, elem.scrollWidth, body.offsetWidth, elem.offsetWidth, body.clientWidth, elem.clientWidth);
}

/**
 * Exports
 */

module.exports = {
  height: getHeight,
  width: getWidth
};

/***/ })
/******/ ]);
});