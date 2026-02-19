"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
// src/controllers/authController.js
var User = require('../module/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
exports.register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, username, password, role, existingUser, hashedPassword, newUser, _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, password = _req$body.password, role = _req$body.role;
          _context.next = 1;
          return User.findOne({
            username: username
          });
        case 1:
          existingUser = _context.sent;
          if (!existingUser) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: 'User  already exists'
          }));
        case 2:
          _context.next = 3;
          return bcrypt.hash(password, 10);
        case 3:
          hashedPassword = _context.sent;
          newUser = new User({
            username: username,
            password: hashedPassword,
            role: role
          });
          _context.next = 4;
          return newUser.save();
        case 4:
          res.status(201).json({
            success: true,
            message: 'User  registered successfully'
          });
          _context.next = 6;
          break;
        case 5:
          _context.prev = 5;
          _t = _context["catch"](0);
          console.error('Registration error:', _t.message);
          res.status(500).json({
            success: false,
            message: 'Registration failed'
          });
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 5]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, username, password, user, isMatch, token, _t2;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          _context2.next = 1;
          return User.findOne({
            username: username
          });
        case 1:
          user = _context2.sent;
          if (user) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: 'Invalid credentials'
          }));
        case 2:
          _context2.next = 3;
          return bcrypt.compare(password, user.password);
        case 3:
          isMatch = _context2.sent;
          if (isMatch) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: 'Invalid credentials'
          }));
        case 4:
          token = jwt.sign({
            id: user._id,
            role: user.role
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          res.status(200).json({
            success: true,
            token: token,
            role: user.role
          });
          _context2.next = 6;
          break;
        case 5:
          _context2.prev = 5;
          _t2 = _context2["catch"](0);
          console.error('Login error:', _t2.message);
          res.status(500).json({
            success: false,
            message: 'Login failed'
          });
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 5]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();