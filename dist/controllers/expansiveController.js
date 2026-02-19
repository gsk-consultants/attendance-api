"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var expansive = require('../module/expansive');
var Category = require("../module/Category");
exports.submitExpansive = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var newExpansive, _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          newExpansive = new expansive(req.body);
          _context.next = 1;
          return newExpansive.save();
        case 1:
          res.status(201).json({
            success: true,
            message: "Payment submitted successfully",
            data: newExpansive
          });
          _context.next = 3;
          break;
        case 2:
          _context.prev = 2;
          _t = _context["catch"](0);
          console.error("Error saving payment:", _t.message);
          res.status(500).json({
            success: false,
            message: "Failed to save payment",
            error: _t.message
          });
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 2]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAllExpansive = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var expansives, _t2;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 1;
          return expansive.find();
        case 1:
          expansives = _context2.sent;
          res.status(200).json({
            success: true,
            data: expansives
          });
          _context2.next = 3;
          break;
        case 2:
          _context2.prev = 2;
          _t2 = _context2["catch"](0);
          console.error("Error fetching payments:", _t2.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch payments"
          });
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 2]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.updateExpansive = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, updatedData, updatedExpansive, _t3;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id; // Get the ID from the request parameters
          updatedData = req.body; // Get the updated data from the request body
          // Find the expansive record by ID and update it
          _context3.next = 1;
          return expansive.findByIdAndUpdate(id, updatedData, {
            "new": true
          });
        case 1:
          updatedExpansive = _context3.sent;
          if (updatedExpansive) {
            _context3.next = 2;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: "Expansive not found"
          }));
        case 2:
          res.status(200).json({
            success: true,
            message: "Expansive updated successfully",
            data: updatedExpansive
          });
          _context3.next = 4;
          break;
        case 3:
          _context3.prev = 3;
          _t3 = _context3["catch"](0);
          console.error("Error updating expansive:", _t3.message);
          res.status(500).json({
            success: false,
            message: "Failed to update expansive",
            error: _t3.message
          });
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 3]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deleteExpansive = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, deletedExpansive, _t4;
    return _regenerator["default"].wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id; // Get the ID from the request parameters
          _context4.next = 1;
          return expansive.findByIdAndDelete(id);
        case 1:
          deletedExpansive = _context4.sent;
          if (deletedExpansive) {
            _context4.next = 2;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            success: false,
            message: "Expansive not found"
          }));
        case 2:
          res.status(200).json({
            success: true,
            message: "Expansive deleted successfully"
          });
          _context4.next = 4;
          break;
        case 3:
          _context4.prev = 3;
          _t4 = _context4["catch"](0);
          console.error("Error deleting expansive:", _t4.message);
          res.status(500).json({
            success: false,
            message: "Failed to delete expansive",
            error: _t4.message
          });
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 3]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getCategories = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var categories, _t5;
    return _regenerator["default"].wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 1;
          return Category.find();
        case 1:
          categories = _context5.sent;
          res.status(200).json({
            success: true,
            data: categories
          });
          _context5.next = 3;
          break;
        case 2:
          _context5.prev = 2;
          _t5 = _context5["catch"](0);
          console.error("Error fetching categories:", _t5.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch categories"
          });
        case 3:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 2]]);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
exports.addCategory = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var name, newCategory, _t6;
    return _regenerator["default"].wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          name = req.body.name;
          newCategory = new Category({
            name: name
          });
          _context6.next = 1;
          return newCategory.save();
        case 1:
          res.status(201).json({
            success: true,
            data: newCategory
          });
          _context6.next = 3;
          break;
        case 2:
          _context6.prev = 2;
          _t6 = _context6["catch"](0);
          console.error("Error adding category:", _t6.message);
          res.status(500).json({
            success: false,
            message: "Failed to add category"
          });
        case 3:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 2]]);
  }));
  return function (_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updateCategory = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, name, updatedCategory, _t7;
    return _regenerator["default"].wrap(function (_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          name = req.body.name;
          _context7.next = 1;
          return Category.findByIdAndUpdate(id, {
            name: name
          }, {
            "new": true
          });
        case 1:
          updatedCategory = _context7.sent;
          if (updatedCategory) {
            _context7.next = 2;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            success: false,
            message: "Category not found"
          }));
        case 2:
          res.status(200).json({
            success: true,
            data: updatedCategory
          });
          _context7.next = 4;
          break;
        case 3:
          _context7.prev = 3;
          _t7 = _context7["catch"](0);
          console.error("Error updating category:", _t7.message);
          res.status(500).json({
            success: false,
            message: "Failed to update category"
          });
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 3]]);
  }));
  return function (_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
exports.deleteCategory = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var id, deletedCategory, _t8;
    return _regenerator["default"].wrap(function (_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          id = req.params.id;
          _context8.next = 1;
          return Category.findByIdAndDelete(id);
        case 1:
          deletedCategory = _context8.sent;
          if (deletedCategory) {
            _context8.next = 2;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            success: false,
            message: "Category not found"
          }));
        case 2:
          res.status(200).json({
            success: true,
            message: "Category deleted successfully"
          });
          _context8.next = 4;
          break;
        case 3:
          _context8.prev = 3;
          _t8 = _context8["catch"](0);
          console.error("Error deleting category:", _t8.message);
          res.status(500).json({
            success: false,
            message: "Failed to delete category",
            error: _t8.message
          });
        case 4:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 3]]);
  }));
  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();
exports.approveExpansive = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var id, amount, expansiveRecord, lastOrder, lastNumber, numberPart, _t9;
    return _regenerator["default"].wrap(function (_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          id = req.params.id; // Get the ID from the request parameters
          amount = req.body.amount; // Find the expansive record by ID
          _context9.next = 1;
          return expansive.findById(id);
        case 1:
          expansiveRecord = _context9.sent;
          if (expansiveRecord) {
            _context9.next = 2;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            success: false,
            message: "Expansive not found"
          }));
        case 2:
          if (!expansiveRecord.approved) {
            _context9.next = 3;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            success: false,
            message: "Expansive is already approved"
          }));
        case 3:
          _context9.next = 4;
          return expansive.find({
            invoiceNo: {
              $regex: /^VR-\d{6}$/
            }
          }).sort({
            invoiceNo: -1
          }) // Sort invoiceNo descending
          .limit(1);
        case 4:
          lastOrder = _context9.sent;
          lastNumber = 1080; // Default starting number
          if (lastOrder.length > 0) {
            numberPart = parseInt(lastOrder[0].invoiceNo.split("-")[1]);
            if (!isNaN(numberPart)) {
              lastNumber = numberPart;
            }
          }

          // Update the expansive record to set approved to true, generate a new invoice number, and set the approval date
          expansiveRecord.approved = true;
          expansiveRecord.approvedAmount = amount;
          expansiveRecord.invoiceNo = "VR-".concat(String(lastNumber + 1).padStart(6, "0"));
          expansiveRecord.approvalDate = new Date(); // Set the current date as the approval date

          // Save the updated record
          _context9.next = 5;
          return expansiveRecord.save();
        case 5:
          res.status(200).json({
            success: true,
            message: "Expansive approved successfully",
            data: expansiveRecord
          });
          _context9.next = 7;
          break;
        case 6:
          _context9.prev = 6;
          _t9 = _context9["catch"](0);
          console.error("Error approving expansive:", _t9.message);
          res.status(500).json({
            success: false,
            message: "Failed to approve expansive",
            error: _t9.message
          });
        case 7:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 6]]);
  }));
  return function (_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();