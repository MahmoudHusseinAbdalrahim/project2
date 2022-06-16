"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var orders_1 = __importDefault(require("./handlers/orders"));
var dashboards_1 = __importDefault(require("./handlers/dashboards"));
var app = (0, express_1["default"])();
var address = "http://localhost:3000";
var corsOptions = {
    origin: 'http://someotherdomain.com',
    optionSuccessStatus: 200
};
app.use((0, cors_1["default"])(corsOptions));
app.use(body_parser_1["default"].json());
app.get('/', function (_req, res) {
    res.send('Hello World!');
});
(0, products_1["default"])(app);
(0, users_1["default"])(app);
(0, orders_1["default"])(app);
(0, dashboards_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
