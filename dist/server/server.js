/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.todo = '/todo';
exports.apiList = [exports.todo];


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(2);
var bodyParser = __webpack_require__(3);
var multer = __webpack_require__(4);
var layout_1 = __webpack_require__(5);
var apis_1 = __webpack_require__(0);
var route_1 = __webpack_require__(6);
var clientPort = 3600;
var app = express();
var upload = multer();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./dist'));
app.use(express.static('./public'));
app.get('*', function (req, res) {
    var clientProp = {
        title: 'server',
        content: '',
        __INITSTATE__: {}
    };
    res.send(layout_1.layout(clientProp));
});
app.post('*', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (apis_1.apiList.indexOf(req.path) >= 0) {
            route_1.default(req, res);
        }
        else {
            res.sendStatus(404);
        }
        return [2 /*return*/];
    });
}); });
app.listen(clientPort, function () { return console.log("start client: http://localhost:" + clientPort); });


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.layout = function (props) { return "\n  <html>\n    <head>\n      <meta name=\"viewport\" content=\"width=1000, initial-scale=1.0, maximum-scale=1.0\">\n      <title>" + props.title + "</title>\n    </head>\n    <body>\n      <div id=\"root\">" + (props.content || '') + "</div>\n      <script src=\"/static/vendor.js\"></script>\n      <script src=\"/static/index.js\"></script>\n      <script>\n        window.__INITSTATE__ = " + JSON.stringify(props.__INITSTATE__ || {}) + "\n      </script>\n    </body>\n  </html>\n"; };


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var apis_1 = __webpack_require__(0);
var todoRoute_1 = __webpack_require__(7);
var successDate = {
    state: 0,
    data: null
};
exports.default = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, sendData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.path;
                switch (_a) {
                    case apis_1.todo: return [3 /*break*/, 1];
                }
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, todoRoute_1.default(req)];
            case 2:
                sendData = _b.sent();
                return [2 /*return*/, res.send(Object.assign({}, successDate, sendData))];
            case 3: return [2 /*return*/];
        }
    });
}); };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var todoDB_1 = __webpack_require__(8);
exports.default = function (req) {
    var param = req.body;
    var type = param.type, _id = param._id, title = param.title, desc = param.desc, date = param.date, tag = param.tag, done = param.done;
    switch (type) {
        case 'add':
            return todoDB_1.default.save({ _id: _id, title: title, desc: desc, date: date, tag: tag, done: done });
        case 'search':
            return todoDB_1.default.search({ _id: _id });
        case 'modify':
            return todoDB_1.default.updata({ _id: _id, title: title, desc: desc, date: date, tag: tag, done: done });
    }
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dbConfig_1 = __webpack_require__(9);
var colName = 'todoList';
exports.default = {
    save: function (data) {
        var title = data.title, desc = data.desc, date = data.date, tag = data.tag, done = data.done;
        return new Promise(function (resolve, reject) {
            dbConfig_1.MongoClient.connect(dbConfig_1.URL, function (err, db) {
                var collection = db.collection(colName);
                collection.insert({ title: title, desc: desc, date: date, tag: tag, done: done, time: new Date().getTime() }, function (inerr, docs) {
                    var _a = docs.ops[0], title = _a.title, _id = _a._id;
                    resolve({ data: { _id: _id } });
                    db.close();
                });
            });
        });
    },
    updata: function (data) {
        var title = data.title, desc = data.desc, date = data.date, tag = data.tag, done = data.done, _id = data._id;
        return new Promise(function (resolve, reject) {
            dbConfig_1.MongoClient.connect(dbConfig_1.URL, function (err, db) {
                var collection = db.collection(colName);
                var where = {
                    _id: new dbConfig_1.ObjectID(_id)
                };
                collection.update(where, { $set: { title: title, desc: desc, date: date, tag: tag, done: done } }, function (inerr, docs) {
                    resolve({});
                    db.close();
                });
            });
        });
    },
    search: function (data) {
        var _id = data._id;
        return new Promise(function (resolve, reject) {
            dbConfig_1.MongoClient.connect(dbConfig_1.URL, function (err, db) {
                var collection = db.collection(colName);
                var where = {};
                if (_id) {
                    where = { _id: _id };
                }
                collection.find(where).toArray(function (searchErr, result) {
                    if (searchErr) {
                        reject("search error");
                    }
                    else {
                        resolve({ data: result });
                        // resolve({ data: result.map(({ _id }) => ({ _id })) })
                    }
                    db.close();
                });
            });
        });
    }
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mongodb = __webpack_require__(10);
exports.MongoClient = mongodb.MongoClient;
exports.ObjectID = mongodb.ObjectID;
exports.URL = 'mongodb://localhost:27017/guardPoint';


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map