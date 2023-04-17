"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_routes_1 = __importDefault(require("./handlers/user_routes"));
var order_routes_1 = __importDefault(require("./handlers/order_routes"));
var product_routes_1 = __importDefault(require("./handlers/product_routes"));
var dashboard_routes_1 = __importDefault(require("./handlers/dashboard_routes"));
var order_product_routes_1 = __importDefault(require("./handlers/order_product_routes"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, user_routes_1["default"])(app);
(0, order_routes_1["default"])(app);
(0, product_routes_1["default"])(app);
(0, dashboard_routes_1["default"])(app);
(0, order_product_routes_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
