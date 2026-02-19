"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var FollowUp = require('../module/followUpModel');
var Student = require('../module/sutdent'); // Ensure the correct model name

// Add a new follow-up
exports.addFollowUp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, enquiryId, followUpDate, remarks, newFollowUp, _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, enquiryId = _req$body.enquiryId, followUpDate = _req$body.followUpDate, remarks = _req$body.remarks; // Validate input
          if (!(!enquiryId || !followUpDate || !remarks)) {
            _context.next = 1;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "All fields are required."
          }));
        case 1:
          // Create a new follow-up instance
          newFollowUp = new FollowUp({
            enquiryId: enquiryId,
            followUpDate: followUpDate,
            remarks: remarks
          });
          _context.next = 2;
          return newFollowUp.save();
        case 2:
          _context.next = 3;
          return Student.findByIdAndUpdate(enquiryId, {
            $push: {
              followUps: newFollowUp._id
            }
          });
        case 3:
          res.status(201).json({
            success: true,
            message: "Follow-Up added successfully",
            data: newFollowUp
          });
          _context.next = 5;
          break;
        case 4:
          _context.prev = 4;
          _t = _context["catch"](0);
          console.error("Error adding follow-up:", _t.message);
          res.status(500).json({
            success: false,
            message: "Failed to add follow-up",
            error: _t.message
          });
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 4]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Get follow-ups by enquiry ID
exports.getFollowUpsByEnquiryId = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var enquiryId, followUps, responseData, _t2;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          enquiryId = req.params.enquiryId;
          _context2.next = 1;
          return FollowUp.find({
            enquiryId: enquiryId
          });
        case 1:
          followUps = _context2.sent;
          if (followUps.length) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: "No follow-ups found for this enquiry."
          }));
        case 2:
          // Map the follow-ups to include only the enquiryId and relevant details
          responseData = followUps.map(function (followUp) {
            return {
              enquiryId: followUp.enquiryId,
              followUpDate: followUp.followUpDate,
              remarks: followUp.remarks,
              createdAt: followUp.createdAt,
              updatedAt: followUp.updatedAt
            };
          });
          res.status(200).json({
            success: true,
            data: responseData
          });
          _context2.next = 4;
          break;
        case 3:
          _context2.prev = 3;
          _t2 = _context2["catch"](0);
          console.error("Error fetching follow-ups:", _t2.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch follow-ups"
          });
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 3]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();