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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mongodb = __webpack_require__(12);
exports.MongoClient = mongodb.MongoClient;
exports.ObjectID = mongodb.ObjectID;
exports.URL = 'mongodb://localhost:27017/guardPoint';


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.todo = '/todo';
exports.apis = '/apis';
exports.apiDatas = '/apiDatas';
exports.selectApiData = '/selectApiData';
exports.trace = './trace';
exports.apiList = [exports.todo, exports.apis, exports.apiDatas, exports.selectApiData, exports.trace];


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dbConfig_1 = __webpack_require__(0);
var colName = 'apiList';
exports.default = {
    save: function (data) {
        var name = data.name, desc = data.desc;
        return new Promise(function (resolve, reject) {
            dbConfig_1.MongoClient.connect(dbConfig_1.URL, function (err, db) {
                var collection = db.collection(colName);
                collection.insert({ name: name, desc: desc, time: new Date().getTime() }, function (inerr, docs) {
                    var _a = docs.ops[0], title = _a.title, _id = _a._id;
                    resolve({ data: { _id: _id } });
                    db.close();
                });
            });
        });
    },
    updata: function (data) {
        var name = data.name, desc = data.desc, _id = data._id;
        return new Promise(function (resolve, reject) {
            dbConfig_1.MongoClient.connect(dbConfig_1.URL, function (err, db) {
                var collection = db.collection(colName);
                var where = {
                    _id: new dbConfig_1.ObjectID(_id)
                };
                collection.update(where, { $set: { name: name, desc: desc } }, function (inerr, docs) {
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
    },
    delete: function (data) {
        var _id = data._id;
        return new Promise(function (resolve, reject) {
            dbConfig_1.MongoClient.connect(dbConfig_1.URL, function (err, db) {
                var collection = db.collection(colName);
                collection.remove({ _id: new dbConfig_1.ObjectID(_id) }, function (delErr, result) {
                    if (delErr) {
                        reject("delete pageType error");
                    }
                    else {
                        // console.log(result.result)
                        resolve({});
                    }
                    db.close();
                });
            });
        });
    }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dbConfig_1 = __webpack_require__(0);
var colName = 'apiData';
exports.default = {
    save: function (data) {
        var fileName = data.fileName, desc = data.desc, apiId = data.apiId;
        return new Promise(function (resolve, reject) {
            dbConfig_1.MongoClient.connect(dbConfig_1.URL, function (err, db) {
                var collection = db.collection(colName);
                collection.insert({ fileName: fileName, desc: desc, apiId: apiId, time: new Date().getTime() }, function (inerr, docs) {
                    var _id = docs.ops[0]._id;
                    resolve({ data: { _id: _id } });
                    db.close();
                });
            });
        });
    },
    search: function (data) {
        var _id = data._id, apiId = data.apiId;
        return new Promise(function (resolve, reject) {
            dbConfig_1.MongoClient.connect(dbConfig_1.URL, function (err, db) {
                var collection = db.collection(colName);
                var where = {};
                if (_id) {
                    where = {
                        _id: new dbConfig_1.ObjectID(_id)
                    };
                }
                if (apiId) {
                    where = { apiId: apiId };
                }
                collection.find(where).toArray(function (searchErr, result) {
                    if (searchErr) {
                        reject("search error");
                    }
                    else {
                        resolve({ data: result });
                    }
                    db.close();
                });
            });
        });
    },
    updated: function (data) {
        var _id = data._id, desc = data.desc, apiId = data.apiId;
        return new Promise(function (resolve, reject) {
            dbConfig_1.MongoClient.connect(dbConfig_1.URL, function (err, db) {
                var collection = db.collection(colName);
                var where = {
                    _id: new dbConfig_1.ObjectID(_id)
                };
                collection.update(where, { $set: { apiId: apiId, desc: desc } }, function (inerr, docs) {
                    resolve({});
                    db.close();
                });
            });
        });
    },
    delete: function (data) {
        var _id = data._id;
        return new Promise(function (resolve, reject) {
            dbConfig_1.MongoClient.connect(dbConfig_1.URL, function (err, db) {
                var collection = db.collection(colName);
                var where = {
                    _id: new dbConfig_1.ObjectID(_id)
                };
                collection.remove(where, function (inerr, docs) {
                    resolve({});
                    db.close();
                });
            });
        });
    }
};


/***/ }),
/* 4 */
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
var express = __webpack_require__(5);
var bodyParser = __webpack_require__(6);
var multer = __webpack_require__(7);
var layout_1 = __webpack_require__(8);
var apis_1 = __webpack_require__(1);
var route_1 = __webpack_require__(9);
var comment_1 = __webpack_require__(20);
var clientPort = 8989;
var app = express();
var upload = multer();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./dist'));
app.use(express.static('./public'));
// 获取所有代理接口地址
app.get('*', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var ProxyApiData, clientProp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, comment_1.checkIsProxy(req.path)];
            case 1:
                ProxyApiData = _a.sent();
                if (ProxyApiData) {
                    res.send(JSON.parse(ProxyApiData));
                }
                else {
                    clientProp = {
                        title: 'server',
                        content: '',
                        __INITSTATE__: {}
                    };
                    res.send(layout_1.layout(clientProp));
                }
                return [2 /*return*/];
        }
    });
}); });
app.post('*', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var ProxyApiData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, comment_1.checkIsProxy(req.path)];
            case 1:
                ProxyApiData = _a.sent();
                if (ProxyApiData) {
                    res.send(JSON.parse(ProxyApiData));
                }
                else {
                    if (apis_1.apiList.indexOf(req.path) >= 0) {
                        route_1.default(req, res);
                    }
                    else {
                        res.sendStatus(404);
                    }
                }
                return [2 /*return*/];
        }
    });
}); });
app.listen(clientPort, function () {
    return console.log("start client: http://localhost:" + clientPort);
});


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.layout = function (props) { return "\n  <html>\n    <head>\n      <meta name=\"viewport\" content=\"width=1000, initial-scale=1.0, maximum-scale=1.0\">\n      <title>" + props.title + "</title>\n    </head>\n    <body>\n      <div id=\"root\">" + (props.content || '') + "</div>\n      <script src=\"/static/vendor.js\"></script>\n      <script src=\"/static/index.js\"></script>\n      <script>\n        window.__INITSTATE__ = " + JSON.stringify(props.__INITSTATE__ || {}) + "\n      </script>\n    </body>\n  </html>\n"; };


/***/ }),
/* 9 */
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
var apis_1 = __webpack_require__(1);
var todoRoute_1 = __webpack_require__(10);
var apiRoute_1 = __webpack_require__(13);
var apiDataRoute_1 = __webpack_require__(14);
var selectApiDataRoute_1 = __webpack_require__(18);
var successDate = {
    state: 0,
    data: null
};
exports.default = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var sendData, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sendData = {};
                _a = req.path;
                switch (_a) {
                    case apis_1.todo: return [3 /*break*/, 1];
                    case apis_1.apis: return [3 /*break*/, 3];
                    case apis_1.apiDatas: return [3 /*break*/, 5];
                    case apis_1.selectApiData: return [3 /*break*/, 7];
                }
                return [3 /*break*/, 9];
            case 1: return [4 /*yield*/, todoRoute_1.default(req)];
            case 2:
                sendData = _b.sent();
                return [2 /*return*/, res.send(Object.assign({}, successDate, sendData))];
            case 3: return [4 /*yield*/, apiRoute_1.default(req)];
            case 4:
                sendData = _b.sent();
                return [2 /*return*/, res.send(Object.assign({}, successDate, sendData))];
            case 5: return [4 /*yield*/, apiDataRoute_1.default(req)];
            case 6:
                sendData = _b.sent();
                return [2 /*return*/, res.send(Object.assign({}, successDate, sendData))];
            case 7: return [4 /*yield*/, selectApiDataRoute_1.default(req)];
            case 8:
                sendData = _b.sent();
                return [2 /*return*/, res.send(Object.assign({}, successDate, sendData))];
            case 9: return [2 /*return*/];
        }
    });
}); };


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var todoDB_1 = __webpack_require__(11);
exports.default = function (req) {
    var param = req.body;
    var type = param.type, _id = param._id, title = param.title, desc = param.desc, date = param.date, tag = param.tag, branch = param.branch, done = param.done;
    switch (type) {
        case 'add':
            return todoDB_1.default.save({ _id: _id, title: title, branch: branch, desc: desc, date: date, tag: tag, done: done });
        case 'search':
            return todoDB_1.default.search({ _id: _id });
        case 'modify':
            return todoDB_1.default.updata({ _id: _id, title: title, desc: desc, date: date, tag: tag, done: done, branch: branch });
    }
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dbConfig_1 = __webpack_require__(0);
var colName = 'todoList';
exports.default = {
    save: function (data) {
        var title = data.title, desc = data.desc, date = data.date, tag = data.tag, branch = data.branch, done = data.done;
        return new Promise(function (resolve, reject) {
            dbConfig_1.MongoClient.connect(dbConfig_1.URL, function (err, db) {
                var collection = db.collection(colName);
                collection.insert({ title: title, desc: desc, date: date, tag: tag, done: done, branch: branch, time: new Date().getTime() }, function (inerr, docs) {
                    var _a = docs.ops[0], title = _a.title, _id = _a._id;
                    resolve({ data: { _id: _id } });
                    db.close();
                });
            });
        });
    },
    updata: function (data) {
        var title = data.title, desc = data.desc, date = data.date, tag = data.tag, done = data.done, branch = data.branch, _id = data._id;
        return new Promise(function (resolve, reject) {
            dbConfig_1.MongoClient.connect(dbConfig_1.URL, function (err, db) {
                var collection = db.collection(colName);
                var where = {
                    _id: new dbConfig_1.ObjectID(_id)
                };
                collection.update(where, { $set: { title: title, desc: desc, date: date, tag: tag, branch: branch, done: done } }, function (inerr, docs) {
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
/* 12 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var apiDB_1 = __webpack_require__(2);
exports.default = function (req) {
    var param = req.body;
    var type = param.type, _id = param._id, name = param.name, desc = param.desc;
    switch (type) {
        case 'add':
            return apiDB_1.default.save({ name: name, desc: desc });
        case 'search':
            return apiDB_1.default.search({ _id: _id });
        case 'modify':
            return apiDB_1.default.updata({ _id: _id, name: name, desc: desc });
        case 'delete':
            return apiDB_1.default.delete({ _id: _id });
    }
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var apiDataDB_1 = __webpack_require__(3);
var apiDataFile_1 = __webpack_require__(15);
exports.default = function (req) { return __awaiter(_this, void 0, void 0, function () {
    var param, type, _id, code, desc, apiId, name, _a, fileName, idSearchResult, code_1, modifyfileName, deletefileName;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                param = req.body;
                type = param.type, _id = param._id, code = param.code, desc = param.desc, apiId = param.apiId, name = param.name;
                _a = type;
                switch (_a) {
                    case 'add': return [3 /*break*/, 1];
                    case 'search': return [3 /*break*/, 3];
                    case 'modify': return [3 /*break*/, 7];
                    case 'delete': return [3 /*break*/, 9];
                }
                return [3 /*break*/, 11];
            case 1: return [4 /*yield*/, apiDataFile_1.default.write(name, code)];
            case 2:
                fileName = _b.sent();
                return [2 /*return*/, apiDataDB_1.default.save({ fileName: fileName, desc: desc, apiId: apiId })];
            case 3:
                if (!apiId) return [3 /*break*/, 4];
                return [2 /*return*/, apiDataDB_1.default.search({ apiId: apiId })];
            case 4:
                if (!_id) return [3 /*break*/, 7];
                return [4 /*yield*/, apiDataDB_1.default.search({ _id: _id })
                    // 再根据文件名去读取文件内容
                ];
            case 5:
                idSearchResult = _b.sent();
                return [4 /*yield*/, apiDataFile_1.default.read(idSearchResult.data[0].fileName)];
            case 6:
                code_1 = _b.sent();
                return [2 /*return*/, {
                        data: __assign({}, idSearchResult.data[0], { code: code_1 })
                    }];
            case 7: return [4 /*yield*/, apiDataFile_1.default.write(name, code)];
            case 8:
                modifyfileName = _b.sent();
                return [2 /*return*/, apiDataDB_1.default.updated({ _id: _id, desc: desc, apiId: apiId })];
            case 9: return [4 /*yield*/, apiDataFile_1.default.delete(name)];
            case 10:
                deletefileName = _b.sent();
                return [2 /*return*/, apiDataDB_1.default.delete({ _id: _id })
                    // return apiDataDB.delete({_id})
                ];
            case 11: return [2 /*return*/];
        }
    });
}); };


/***/ }),
/* 15 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __webpack_require__(16);
var path = __webpack_require__(17);
var filePath = function (name) { return path.join(__dirname, '/../data/') + name + '.json'; };
exports.default = {
    write: function (name, code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!name) {
                            name = 'p' + new Date().getTime();
                        }
                        var savePath = filePath(name);
                        fs.writeFile(savePath, code, 'utf-8', function (err) {
                            resolve(name);
                        });
                    })];
            });
        });
    },
    read: function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        fs.readFile(filePath(name), 'utf-8', function (err, data) {
                            resolve(data);
                        });
                    })];
            });
        });
    },
    delete: function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        fs.unlink(filePath(name), function (err) {
                            resolve();
                        });
                    })];
            });
        });
    }
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import { ITApiFetch } from '../src/interface'
var selectedApiDataDB_1 = __webpack_require__(19);
exports.default = function (req) {
    var param = req.body;
    var apiId = param.apiId, apiDataId = param.apiDataId, type = param.type;
    switch (type) {
        // case 'add':
        //   return selectedApiDataDB.save({ apiId, apiDataId })
        case 'search':
            return selectedApiDataDB_1.default.search({ apiId: apiId });
        case 'modify':
            return selectedApiDataDB_1.default.updata({ apiId: apiId, apiDataId: apiDataId });
    }
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dbConfig_1 = __webpack_require__(0);
// import { ITApiListInfo } from '../src/interface'
var colName = 'selectedApiData';
exports.default = {
    search: function (data) {
        var apiId = data.apiId, apiDataId = data.apiDataId;
        return new Promise(function (resolve, reject) {
            dbConfig_1.MongoClient.connect(dbConfig_1.URL, function (err, db) {
                var collection = db.collection(colName);
                var where = {
                    apiId: apiId
                };
                collection.find(where).toArray(function (searchErr, result) {
                    if (searchErr) {
                        reject("search error");
                    }
                    else {
                        resolve({ data: result });
                    }
                    db.close();
                });
            });
        });
    },
    updata: function (data) {
        var apiId = data.apiId, apiDataId = data.apiDataId;
        return new Promise(function (resolve, reject) {
            dbConfig_1.MongoClient.connect(dbConfig_1.URL, function (err, db) {
                var collection = db.collection(colName);
                var where = {
                    apiId: apiId
                };
                collection.find(where).toArray(function (searchErr, result) {
                    if (!result.length) {
                        collection.insert({ apiId: apiId, apiDataId: apiDataId, time: new Date().getTime() }, function (inerr, docs) {
                            var _id = docs.ops[0]._id;
                            resolve({ data: { _id: _id } });
                            db.close();
                        });
                    }
                    else {
                        collection.update(where, { $set: { apiId: apiId, apiDataId: apiDataId } }, function (inerr, docs) {
                            resolve({});
                            db.close();
                        });
                    }
                });
            });
        });
    }
};


/***/ }),
/* 20 */
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
var apiDB_1 = __webpack_require__(2);
var apiDataDB_1 = __webpack_require__(3);
var selectedApiDataDB_1 = __webpack_require__(19);
var apiDataFile_1 = __webpack_require__(15);
exports.checkIsProxy = function (path) { return __awaiter(_this, void 0, void 0, function () {
    var result, apiId, apiDataResult, selectedDataResult_1, setlectedApiData_1, readResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, apiDB_1.default.search({})];
            case 1:
                result = _a.sent();
                apiId = null;
                result.data.some(function (_a) {
                    var _id = _a._id, name = _a.name;
                    if (name === path) {
                        apiId = _id;
                        return true;
                    }
                });
                if (!apiId) return [3 /*break*/, 5];
                return [4 /*yield*/, apiDataDB_1.default.search({
                        apiId: apiId.toString()
                    })];
            case 2:
                apiDataResult = _a.sent();
                return [4 /*yield*/, selectedApiDataDB_1.default.search({
                        apiId: apiId.toString()
                    })];
            case 3:
                selectedDataResult_1 = _a.sent();
                setlectedApiData_1 = {};
                apiDataResult.data.some(function (item) {
                    if (item._id.toString() === selectedDataResult_1.data[0].apiDataId) {
                        setlectedApiData_1 = item;
                        return true;
                    }
                });
                return [4 /*yield*/, apiDataFile_1.default.read(setlectedApiData_1.fileName)];
            case 4:
                readResult = _a.sent();
                return [2 /*return*/, readResult];
            case 5: return [2 /*return*/, ''];
        }
    });
}); };


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map