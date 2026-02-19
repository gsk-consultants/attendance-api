"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require('path');

// Load environment variables
require('dotenv').config();
var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
var sendInquiryEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(to, studentData) {
    var templatePath, template, mailOptionsToParent, mailOptionsToAdmin, _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Read the HTML template
          templatePath = path.join(__dirname, "Templetes/inquiryNotification.html");
          template = fs.readFileSync(templatePath, 'utf8'); // Replace placeholders with actual data
          template = template.replace('{{studentName}}', studentData.studentName).replace('{{fatherName}}', studentData.fatherName).replace('{{fatherMobile}}', studentData.fatherMobile);

          // Mail options for the parent
          mailOptionsToParent = {
            from: process.env.EMAIL_USER,
            // Use the environment variable for the sender's email
            to: to,
            // Father's email
            subject: 'New Student Enquiry Notification',
            html: template
          }; // Send email to the parent
          _context.next = 1;
          return transporter.sendMail(mailOptionsToParent);
        case 1:
          console.log("\uD83D\uDCE7 Enquiry email sent to: ".concat(to));

          // Mail options for yourself (admin)
          mailOptionsToAdmin = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: '📩 New Inquiry Received',
            html: "\n        <h1>New Enquiry from ".concat(studentData.studentName, "</h1>\n        <p>You have received a new inquiry:</p>\n        <ul>\n          <li><strong>Student Name:</strong> ").concat(studentData.studentName, "</li>\n          <li><strong>Father's Name:</strong> ").concat(studentData.fatherName, "</li>\n          <li><strong>Mobile Number:</strong> ").concat(studentData.fatherMobile, "</li>\n        </ul>\n        <p>\n          <a href=\"https://kalamkids.in/login\" target=\"_blank\" style=\"display:inline-block;margin-top:10px;padding:8px 15px;background-color:#114497;color:#fff;text-decoration:none;border-radius:5px;\">\n            Click Here to Login\n          </a>\n        </p>\n      ")
          }; // Send email to yourself (admin)
          _context.next = 2;
          return transporter.sendMail(mailOptionsToAdmin);
        case 2:
          console.log("\uD83D\uDCE7 Inquiry notification sent to admin: ".concat(process.env.EMAIL_USER));
          _context.next = 4;
          break;
        case 3:
          _context.prev = 3;
          _t = _context["catch"](0);
          console.error("❌ Error sending inquiry email:", _t);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 3]]);
  }));
  return function sendInquiryEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var sendAdmissionApprovalEmail = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(to, studentData) {
    var templatePath, template, mailOptions, _t2;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Read the HTML template
          templatePath = path.join(__dirname, "Templetes/admissionApprovalNotification.html");
          template = fs.readFileSync(templatePath, 'utf8'); // Replace placeholders with actual data
          template = template.replace('{{studentName}}', studentData.studentName).replace('{{admissionNumber}}', studentData.admissionNumber).replace('{{parentType}}', studentData.parentType);

          // Mail options for the parent
          mailOptions = {
            from: process.env.EMAIL_USER,
            // Use the environment variable for the sender's email
            to: to,
            // Parent's email
            subject: 'Admission Approval Notification',
            html: template
          }; // Send email to the parent
          _context2.next = 1;
          return transporter.sendMail(mailOptions);
        case 1:
          console.log("\uD83D\uDCE7 Admission approval email sent to: ".concat(to));
          _context2.next = 3;
          break;
        case 2:
          _context2.prev = 2;
          _t2 = _context2["catch"](0);
          console.error("❌ Error sending admission approval email:", _t2);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 2]]);
  }));
  return function sendAdmissionApprovalEmail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var sendEmail = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(to, subject, templatePath, replacements) {
    var template, _i, _Object$entries, _Object$entries$_i, key, value, _i2, _Object$entries2, _Object$entries2$_i, nestedKey, nestedValue, mailOptions, _t3;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // Read the HTML template
          template = fs.readFileSync(templatePath, 'utf8'); // Replace placeholders with actual data
          for (_i = 0, _Object$entries = Object.entries(replacements); _i < _Object$entries.length; _i++) {
            _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
            if ((0, _typeof2["default"])(value) === 'object') {
              // Handle nested objects
              for (_i2 = 0, _Object$entries2 = Object.entries(value); _i2 < _Object$entries2.length; _i2++) {
                _Object$entries2$_i = (0, _slicedToArray2["default"])(_Object$entries2[_i2], 2), nestedKey = _Object$entries2$_i[0], nestedValue = _Object$entries2$_i[1];
                template = template.replace(new RegExp("{{".concat(key, ".").concat(nestedKey, "}}"), 'g'), nestedValue);
              }
            } else {
              template = template.replace(new RegExp("{{".concat(key, "}}"), 'g'), value);
            }
          }

          // Mail options
          mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: template
          }; // Send email
          _context3.next = 1;
          return transporter.sendMail(mailOptions);
        case 1:
          console.log("\uD83D\uDCE7 Email sent to: ".concat(to));
          _context3.next = 3;
          break;
        case 2:
          _context3.prev = 2;
          _t3 = _context3["catch"](0);
          console.error("❌ Error sending email:", _t3);
        case 3:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function sendEmail(_x5, _x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
var sendInquiryEmailToFather = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(to, studentData) {
    var templatePath;
    return _regenerator["default"].wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          templatePath = path.join(__dirname, "Templetes/fatherInquiryNotification.html");
          _context4.next = 1;
          return sendEmail(to, 'PAYMENT RECEIPT', templatePath, studentData);
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function sendInquiryEmailToFather(_x9, _x0) {
    return _ref4.apply(this, arguments);
  };
}();
var sendInquiryEmailToMother = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(to, studentData) {
    var templatePath;
    return _regenerator["default"].wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          templatePath = path.join(__dirname, "Templetes/motherInquiryNotification.html");
          _context5.next = 1;
          return sendEmail(to, 'PAYMENT RECEIPT', templatePath, studentData);
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function sendInquiryEmailToMother(_x1, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
module.exports = {
  sendInquiryEmail: sendInquiryEmail,
  sendAdmissionApprovalEmail: sendAdmissionApprovalEmail,
  sendInquiryEmailToFather: sendInquiryEmailToFather,
  sendInquiryEmailToMother: sendInquiryEmailToMother
};