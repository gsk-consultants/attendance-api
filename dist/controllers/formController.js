"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Form = require("../module/formModel");
var Student = require("../module/sutdent"); // Corrected the typo
// const { sendEmail } = require('../mailer'); 
var _require = require('../mailer'),
  sendInquiryEmail = _require.sendInquiryEmail,
  sendAdmissionApprovalEmail = _require.sendAdmissionApprovalEmail,
  sendInquiryEmailToFather = _require.sendInquiryEmailToFather,
  sendInquiryEmailToMother = _require.sendInquiryEmailToMother;
var expansive = require("../module/expansive");

// Adjust the path as necessary
// Adjust the path as necessary
exports.submitForm = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var formData, newForm, _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          formData = req.body; // Get the data from the request body
          console.log("Received form data:", formData); // Log the incoming data

          // Validate characteristics
          if (Array.isArray(formData.childPersonalBackground.characteristics)) {
            _context.next = 1;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Characteristics must be an array."
          }));
        case 1:
          if (formData.childPersonalBackground.characteristics.every(function (item) {
            return typeof item === 'string';
          })) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "All characteristics must be strings."
          }));
        case 2:
          // Create a new instance of the Form model
          newForm = new Form(formData); // Save to the database
          _context.next = 3;
          return newForm.save();
        case 3:
          // Respond with success
          res.status(201).json({
            success: true,
            message: "Form submitted successfully",
            data: newForm
          });
          _context.next = 5;
          break;
        case 4:
          _context.prev = 4;
          _t = _context["catch"](0);
          console.error("Error saving form:", _t.message);
          res.status(500).json({
            success: false,
            message: "Failed to save form",
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
exports.updateForm = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, updatedData, form, _t2;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id; // Get the form ID from the request parameters
          updatedData = req.body; // Get the updated data from the request body
          // Validate the input if necessary
          if (updatedData) {
            _context2.next = 1;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "No data provided for update."
          }));
        case 1:
          _context2.next = 2;
          return Form.findByIdAndUpdate(id, updatedData, {
            "new": true
          });
        case 2:
          form = _context2.sent;
          if (form) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: "Form not found."
          }));
        case 3:
          res.status(200).json({
            success: true,
            message: "Form updated successfully.",
            data: form
          });
          _context2.next = 5;
          break;
        case 4:
          _context2.prev = 4;
          _t2 = _context2["catch"](0);
          console.error("Error updating form:", _t2.message);
          res.status(500).json({
            success: false,
            message: "Failed to update form."
          });
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 4]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getFormById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, form, _t3;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 1;
          return Form.findById(id);
        case 1:
          form = _context3.sent;
          if (form) {
            _context3.next = 2;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: "Form not found"
          }));
        case 2:
          res.status(200).json({
            success: true,
            data: form
          });
          _context3.next = 4;
          break;
        case 3:
          _context3.prev = 3;
          _t3 = _context3["catch"](0);
          console.error("Error fetching form:", _t3.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch form"
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
exports.getAllForm = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var form, _t4;
    return _regenerator["default"].wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 1;
          return Form.find();
        case 1:
          form = _context4.sent;
          res.status(200).json({
            success: true,
            data: form
          });
          _context4.next = 3;
          break;
        case 2:
          _context4.prev = 2;
          _t4 = _context4["catch"](0);
          console.error("Error fetching students:", _t4.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch students"
          });
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 2]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.deleteForm = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, form, _t5;
    return _regenerator["default"].wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 1;
          return Form.findByIdAndDelete(id);
        case 1:
          form = _context5.sent;
          if (form) {
            _context5.next = 2;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            success: false,
            message: "Form not found"
          }));
        case 2:
          res.status(200).json({
            success: true,
            message: "Form deleted successfully"
          });
          _context5.next = 4;
          break;
        case 3:
          _context5.prev = 3;
          _t5 = _context5["catch"](0);
          console.error("Error deleting form:", _t5.message);
          res.status(500).json({
            success: false,
            message: "Failed to delete form"
          });
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 3]]);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
exports.submitStudent = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var studentData, newStudent, _t6;
    return _regenerator["default"].wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          studentData = req.body;
          console.log("Received student data:", studentData);

          // Validate required fields
          if (!(!studentData.studentName || !studentData.fatherName || !studentData.fatherMobile)) {
            _context6.next = 1;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            success: false,
            message: "All fields are required"
          }));
        case 1:
          // Create a new student instance
          newStudent = new Student(studentData);
          _context6.next = 2;
          return newStudent.save();
        case 2:
          if (!studentData.fatherEmail) {
            _context6.next = 3;
            break;
          }
          _context6.next = 3;
          return sendInquiryEmail(studentData.fatherEmail, studentData);
        case 3:
          if (!studentData.motherEmail) {
            _context6.next = 4;
            break;
          }
          _context6.next = 4;
          return sendInquiryEmail(studentData.motherEmail, studentData);
        case 4:
          res.status(201).json({
            success: true,
            message: "Student submitted successfully",
            data: newStudent
          });
          _context6.next = 6;
          break;
        case 5:
          _context6.prev = 5;
          _t6 = _context6["catch"](0);
          console.error("Student submission error:", _t6.message);
          res.status(500).json({
            success: false,
            message: "Submission failed",
            error: _t6.message
          });
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 5]]);
  }));
  return function (_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getStudentById = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, student, _t7;
    return _regenerator["default"].wrap(function (_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _context7.next = 1;
          return Student.findById(id);
        case 1:
          student = _context7.sent;
          if (student) {
            _context7.next = 2;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            success: false,
            message: "Student not found"
          }));
        case 2:
          res.status(200).json({
            success: true,
            data: student
          });
          _context7.next = 4;
          break;
        case 3:
          _context7.prev = 3;
          _t7 = _context7["catch"](0);
          console.error("Error fetching student:", _t7.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch student"
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
exports.getAllStudents = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var students, _t8;
    return _regenerator["default"].wrap(function (_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 1;
          return Student.find();
        case 1:
          students = _context8.sent;
          res.status(200).json({
            success: true,
            data: students
          });
          _context8.next = 3;
          break;
        case 2:
          _context8.prev = 2;
          _t8 = _context8["catch"](0);
          console.error("Error fetching students:", _t8.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch students"
          });
        case 3:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 2]]);
  }));
  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();
exports.deleteStudent = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var id, student, _t9;
    return _regenerator["default"].wrap(function (_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          id = req.params.id;
          _context9.next = 1;
          return Student.findByIdAndDelete(id);
        case 1:
          student = _context9.sent;
          if (student) {
            _context9.next = 2;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            success: false,
            message: "Student not found"
          }));
        case 2:
          res.status(200).json({
            success: true,
            message: "Student deleted successfully"
          });
          _context9.next = 4;
          break;
        case 3:
          _context9.prev = 3;
          _t9 = _context9["catch"](0);
          console.error("Error deleting student:", _t9.message);
          res.status(500).json({
            success: false,
            message: "Failed to delete student"
          });
        case 4:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 3]]);
  }));
  return function (_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();
exports.approveForm = /*#__PURE__*/function () {
  var _ref0 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee0(req, res) {
    var id, feeAmount, lastOrder, lastNumber, numberPart, newInvoiceNo, existingForm, form, _form$particularsOfCh, _form$particularsOfPa, FatherEmail, MotherEmail, studentData, _t0;
    return _regenerator["default"].wrap(function (_context0) {
      while (1) switch (_context0.prev = _context0.next) {
        case 0:
          _context0.prev = 0;
          id = req.params.id;
          feeAmount = req.body.feeAmount; // Validate fee amount
          if (!(!feeAmount || isNaN(feeAmount) || feeAmount <= 0)) {
            _context0.next = 1;
            break;
          }
          return _context0.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid fee amount"
          }));
        case 1:
          _context0.next = 2;
          return Form.find({
            invoiceNo: {
              $regex: /^KSS-\d{6}$/
            }
          }).sort({
            invoiceNo: -1
          }) // Sort invoiceNo descending
          .limit(1);
        case 2:
          lastOrder = _context0.sent;
          lastNumber = 700; // Default starting number
          if (lastOrder.length > 0) {
            numberPart = parseInt(lastOrder[0].invoiceNo.split("-")[1]);
            if (!isNaN(numberPart)) {
              lastNumber = numberPart;
            }
          }
          newInvoiceNo = "KSS-".concat(String(lastNumber + 1).padStart(6, "0")); // Check if the form is already approved to avoid double invoicing
          _context0.next = 3;
          return Form.findById(id);
        case 3:
          existingForm = _context0.sent;
          if (existingForm) {
            _context0.next = 4;
            break;
          }
          return _context0.abrupt("return", res.status(404).json({
            success: false,
            message: "Form not found"
          }));
        case 4:
          if (!(existingForm.isApproved && existingForm.invoiceNo)) {
            _context0.next = 5;
            break;
          }
          return _context0.abrupt("return", res.status(400).json({
            success: false,
            message: "Form already approved"
          }));
        case 5:
          _context0.next = 6;
          return Form.findByIdAndUpdate(id, {
            isApproved: true,
            invoiceNo: newInvoiceNo,
            feeAmount: feeAmount
          },
          // Add feeAmount to update
          {
            "new": true
          });
        case 6:
          form = _context0.sent;
          if (!form.particularsOfParents) {
            _context0.next = 8;
            break;
          }
          _form$particularsOfPa = form.particularsOfParents, FatherEmail = _form$particularsOfPa.FatherEmail, MotherEmail = _form$particularsOfPa.MotherEmail; // Assuming these fields exist
          studentData = {
            studentName: ((_form$particularsOfCh = form.particularsOfChild) === null || _form$particularsOfCh === void 0 ? void 0 : _form$particularsOfCh.fullName) || "Student",
            admissionNumber: newInvoiceNo
          }; // Send email to father
          if (!FatherEmail) {
            _context0.next = 7;
            break;
          }
          _context0.next = 7;
          return sendAdmissionApprovalEmail(FatherEmail, _objectSpread(_objectSpread({}, studentData), {}, {
            parentType: 'Father'
          }));
        case 7:
          if (!MotherEmail) {
            _context0.next = 8;
            break;
          }
          _context0.next = 8;
          return sendAdmissionApprovalEmail(MotherEmail, _objectSpread(_objectSpread({}, studentData), {}, {
            parentType: 'Mother'
          }));
        case 8:
          res.status(200).json({
            success: true,
            message: "Form approved successfully",
            data: form
          });
          _context0.next = 10;
          break;
        case 9:
          _context0.prev = 9;
          _t0 = _context0["catch"](0);
          console.error("Error approving form:", _t0.message);
          res.status(500).json({
            success: false,
            message: "Failed to approve form"
          });
        case 10:
        case "end":
          return _context0.stop();
      }
    }, _callee0, null, [[0, 9]]);
  }));
  return function (_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}();
exports.getFormById = /*#__PURE__*/function () {
  var _ref1 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee1(req, res) {
    var id, form, _t1;
    return _regenerator["default"].wrap(function (_context1) {
      while (1) switch (_context1.prev = _context1.next) {
        case 0:
          _context1.prev = 0;
          id = req.params.id;
          _context1.next = 1;
          return Form.findById(id);
        case 1:
          form = _context1.sent;
          if (form) {
            _context1.next = 2;
            break;
          }
          return _context1.abrupt("return", res.status(404).json({
            success: false,
            message: "Form not found"
          }));
        case 2:
          res.status(200).json({
            success: true,
            data: form
          });
          _context1.next = 4;
          break;
        case 3:
          _context1.prev = 3;
          _t1 = _context1["catch"](0);
          console.error("Error fetching form:", _t1.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch form"
          });
        case 4:
        case "end":
          return _context1.stop();
      }
    }, _callee1, null, [[0, 3]]);
  }));
  return function (_x19, _x20) {
    return _ref1.apply(this, arguments);
  };
}();
exports.getApprovedForms = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var approvedForms, _t10;
    return _regenerator["default"].wrap(function (_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 1;
          return Form.find({
            isApproved: true
          });
        case 1:
          approvedForms = _context10.sent;
          if (!(approvedForms.length === 0)) {
            _context10.next = 2;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            success: false,
            message: "No approved forms found"
          }));
        case 2:
          res.status(200).json({
            success: true,
            data: approvedForms
          });
          _context10.next = 4;
          break;
        case 3:
          _context10.prev = 3;
          _t10 = _context10["catch"](0);
          console.error("Error fetching approved forms:", _t10.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch approved forms"
          });
        case 4:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 3]]);
  }));
  return function (_x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}();
var formatDate = function formatDate(date) {
  var options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  return date.toLocaleDateString('en-CA', options).split('/').join('-'); // Format to YYYY-MM-DD
};
exports.payForm = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var _req$body, amount, paidBy, amountInWords, cashReceivedFrom, relationshipName, chequeDetails, qrTransactionId, bankTransferId, cashDenominations, receiverName, form, lastFormWithPayment, lastNumber, lastPayment, lastId, match, newInvoiceNo, newRemainingBalance, newPayment, studentData, fatherEmail, motherEmail, _t11;
    return _regenerator["default"].wrap(function (_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _req$body = req.body, amount = _req$body.amount, paidBy = _req$body.paidBy, amountInWords = _req$body.amountInWords, cashReceivedFrom = _req$body.cashReceivedFrom, relationshipName = _req$body.relationshipName, chequeDetails = _req$body.chequeDetails, qrTransactionId = _req$body.qrTransactionId, bankTransferId = _req$body.bankTransferId, cashDenominations = _req$body.cashDenominations, receiverName = _req$body.receiverName;
          _context11.prev = 1;
          _context11.next = 2;
          return Form.findById(req.params.id);
        case 2:
          form = _context11.sent;
          if (form) {
            _context11.next = 3;
            break;
          }
          return _context11.abrupt("return", res.status(404).send("Form not found"));
        case 3:
          form.feePayments = form.feePayments || [];

          // Fetch the last payment's invoice number
          _context11.next = 4;
          return Form.findOne({
            "feePayments.0": {
              $exists: true
            }
          }).sort({
            "feePayments._id": -1
          }).select("feePayments");
        case 4:
          lastFormWithPayment = _context11.sent;
          lastNumber = 2083; // Default starting number
          if (lastFormWithPayment) {
            lastPayment = lastFormWithPayment.feePayments[lastFormWithPayment.feePayments.length - 1];
            lastId = (lastPayment === null || lastPayment === void 0 ? void 0 : lastPayment._id) || "";
            match = lastId.match(/^CR-(\d{6})$/);
            if (match) {
              lastNumber = parseInt(match[1]);
            }
          }
          newInvoiceNo = "CR-".concat(String(lastNumber + 1).padStart(6, "0"));
          newRemainingBalance = form.feeAmount - ((form.paidFee || 0) + amount);
          newPayment = {
            _id: newInvoiceNo,
            amount: amount,
            paidBy: paidBy,
            amountInWords: amountInWords,
            cashReceivedFrom: cashReceivedFrom,
            relationshipName: relationshipName,
            chequeDetails: chequeDetails,
            qrTransactionId: qrTransactionId,
            bankTransferId: bankTransferId,
            cashDenominations: cashDenominations,
            receiverName: receiverName,
            date: formatDate(new Date()),
            remainingBalance: newRemainingBalance
          };
          form.paidFee = (form.paidFee || 0) + amount;
          form.feePayments.push(newPayment);
          _context11.next = 5;
          return form.save();
        case 5:
          // Prepare student data for emails, including payment details
          studentData = {
            studentName: form.particularsOfChild.fullName,
            fatherName: form.particularsOfParents.FatherName,
            fatherMobile: form.particularsOfParents.FatherMobile,
            motherName: form.particularsOfParents.MotherName,
            motherMobile: form.particularsOfParents.MotherMobile,
            admissionNumber: form.invoiceNo,
            "class": form.admissionFor,
            paymentDetails: {
              _id: newInvoiceNo,
              amount: amount,
              paidBy: paidBy,
              amountInWords: amountInWords,
              cashReceivedFrom: cashReceivedFrom,
              relationshipName: relationshipName,
              chequeDetails: chequeDetails,
              qrTransactionId: qrTransactionId,
              bankTransferId: bankTransferId,
              cashDenominations: cashDenominations,
              receiverName: receiverName,
              date: newPayment.date,
              remainingBalance: newRemainingBalance
            }
          }; // Send emails to both parents
          fatherEmail = form.particularsOfParents.FatherEmail;
          motherEmail = form.particularsOfParents.MotherEmail;
          if (!fatherEmail) {
            _context11.next = 6;
            break;
          }
          _context11.next = 6;
          return sendInquiryEmailToFather(fatherEmail, studentData);
        case 6:
          if (!motherEmail) {
            _context11.next = 7;
            break;
          }
          _context11.next = 7;
          return sendInquiryEmailToMother(motherEmail, studentData);
        case 7:
          res.send({
            message: "Payment successful",
            paymentId: newInvoiceNo,
            updatedForm: form
          });
          _context11.next = 9;
          break;
        case 8:
          _context11.prev = 8;
          _t11 = _context11["catch"](1);
          console.error("Error processing payment:", _t11.message);
          res.status(500).json({
            success: false,
            message: "Payment processing failed"
          });
        case 9:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[1, 8]]);
  }));
  return function (_x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}();
exports.getPaymentsForForm = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var id, form, feePaymentsWithFormId, _t12;
    return _regenerator["default"].wrap(function (_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          id = req.params.id;
          _context12.next = 1;
          return Form.findById(id);
        case 1:
          form = _context12.sent;
          if (form) {
            _context12.next = 2;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            success: false,
            message: "Form not found"
          }));
        case 2:
          feePaymentsWithFormId = form.feePayments.map(function (payment) {
            return _objectSpread(_objectSpread({}, payment.toObject()), {}, {
              // convert Mongoose subdoc to plain JS object
              formId: form._id // manually add the form ID
            });
          });
          res.status(200).json({
            success: true,
            data: {
              paymentId: form._id,
              cashNo: form.cashNo,
              totalPaid: form.paidFee,
              feePayments: feePaymentsWithFormId
            }
          });
          _context12.next = 4;
          break;
        case 3:
          _context12.prev = 3;
          _t12 = _context12["catch"](0);
          console.error("Error fetching payments:", _t12.message);
          res.status(500).json({
            success: false,
            message: "Something went wrong"
          });
        case 4:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 3]]);
  }));
  return function (_x25, _x26) {
    return _ref12.apply(this, arguments);
  };
}();
exports.getAllPayments = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var forms, allPayments, _t13;
    return _regenerator["default"].wrap(function (_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 1;
          return Form.find({});
        case 1:
          forms = _context13.sent;
          allPayments = forms.flatMap(function (form) {
            var totalPaidFee = 0; // Initialize total paid fee for each form

            return (form.feePayments || []).map(function (payment) {
              var _form$particularsOfCh2, _form$particularsOfPa2, _form$particularsOfPa3;
              totalPaidFee += payment.amount || 0; // Accumulate the total paid fee

              // Calculate remaining amount for this payment
              var remaining = form.feeAmount - totalPaidFee; // Remaining amount after this payment

              return {
                paymentId: payment._id,
                cashNo: payment.cashNo,
                fullName: ((_form$particularsOfCh2 = form.particularsOfChild) === null || _form$particularsOfCh2 === void 0 ? void 0 : _form$particularsOfCh2.fullName) || "",
                fatherMobile: ((_form$particularsOfPa2 = form.particularsOfParents) === null || _form$particularsOfPa2 === void 0 ? void 0 : _form$particularsOfPa2.FatherMobile) || "",
                motherMobile: ((_form$particularsOfPa3 = form.particularsOfParents) === null || _form$particularsOfPa3 === void 0 ? void 0 : _form$particularsOfPa3.MotherMobile) || "",
                registerNo: form.invoiceNo || "",
                "class": form.admissionFor || "",
                amount: payment.amount,
                paidBy: payment.paidBy,
                date: payment.date,
                feeAmount: form.feeAmount,
                paidFee: totalPaidFee,
                remaining: remaining,
                amountInWords: payment.amountInWords,
                cashReceivedFrom: payment.cashReceivedFrom,
                relationshipName: payment.relationshipName,
                chequeDetails: payment.chequeDetails,
                qrTransactionId: payment.qrTransactionId,
                bankTransferId: payment.bankTransferId,
                cashDenominations: payment.cashDenominations,
                receiverName: payment.receiverName
              };
            });
          });
          res.status(200).json({
            success: true,
            data: allPayments
          });
          _context13.next = 3;
          break;
        case 2:
          _context13.prev = 2;
          _t13 = _context13["catch"](0);
          console.error("Error fetching all payments:", _t13.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch all payments"
          });
        case 3:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 2]]);
  }));
  return function (_x27, _x28) {
    return _ref13.apply(this, arguments);
  };
}();
exports.getPaymentHistory = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var id, form, paymentHistory, overallPaidFee, _t14;
    return _regenerator["default"].wrap(function (_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          id = req.params.id;
          _context14.next = 1;
          return Form.findById(id);
        case 1:
          form = _context14.sent;
          if (form) {
            _context14.next = 2;
            break;
          }
          return _context14.abrupt("return", res.status(404).json({
            success: false,
            message: "Form not found"
          }));
        case 2:
          // Prepare the payment history
          paymentHistory = form.feePayments.map(function (payment) {
            return {
              cashNo: payment.cashNo,
              date: payment.date,
              amount: payment.amount
            };
          }); // Calculate the overall paid fee
          overallPaidFee = form.paidFee;
          res.status(200).json({
            success: true,
            data: {
              formId: form._id,
              overallPaidFee: overallPaidFee,
              paymentHistory: paymentHistory
            }
          });
          _context14.next = 4;
          break;
        case 3:
          _context14.prev = 3;
          _t14 = _context14["catch"](0);
          console.error("Error fetching payment history:", _t14.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch payment history"
          });
        case 4:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 3]]);
  }));
  return function (_x29, _x30) {
    return _ref14.apply(this, arguments);
  };
}();
exports.getOverallPayment = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var forms, totalPaid, expansives, totalExpansiveAmount, adjustedTotalPaid, _t15;
    return _regenerator["default"].wrap(function (_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 1;
          return Form.find({});
        case 1:
          forms = _context15.sent;
          totalPaid = forms.reduce(function (acc, form) {
            return acc + (form.paidFee || 0);
          }, 0); // Fetch all expansive records and calculate total amount
          _context15.next = 2;
          return expansive.find({});
        case 2:
          expansives = _context15.sent;
          totalExpansiveAmount = expansives.reduce(function (acc, exp) {
            return acc + (exp.approvedAmount || 0);
          }, 0);
          adjustedTotalPaid = totalPaid - totalExpansiveAmount;
          res.status(200).json({
            success: true,
            BalanceAmount: adjustedTotalPaid,
            totalPaid: totalPaid
          });
          _context15.next = 4;
          break;
        case 3:
          _context15.prev = 3;
          _t15 = _context15["catch"](0);
          console.error("Error fetching overall payment:", _t15.message);
          res.status(500).json({
            success: false,
            message: "Failed to fetch overall payment"
          });
        case 4:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 3]]);
  }));
  return function (_x31, _x32) {
    return _ref15.apply(this, arguments);
  };
}();
exports.getCounts = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var studentCount, formCount, approvedFormCount, forms, totalCollectedFees, totalCollected, totalFeeAmount, overallFeeAmount, totalPaid, expansives, totalExpansiveAmount, adjustedTotalPaid, _t16;
    return _regenerator["default"].wrap(function (_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 1;
          return Student.countDocuments();
        case 1:
          studentCount = _context16.sent;
          _context16.next = 2;
          return Form.countDocuments();
        case 2:
          formCount = _context16.sent;
          _context16.next = 3;
          return Form.countDocuments({
            isApproved: true
          });
        case 3:
          approvedFormCount = _context16.sent;
          _context16.next = 4;
          return Form.find({});
        case 4:
          forms = _context16.sent;
          _context16.next = 5;
          return Form.aggregate([{
            $group: {
              _id: null,
              // Grouping by null to get a single result
              total: {
                $sum: {
                  $ifNull: ["$paidFee", 0]
                }
              } // Sum the paidFee field, defaulting to 0 if null
            }
          }]);
        case 5:
          totalCollectedFees = _context16.sent;
          totalCollected = totalCollectedFees.length > 0 ? totalCollectedFees[0].total : 0; // Get the total amount or default to 0
          // Calculate the overall fee amount of all forms
          _context16.next = 6;
          return Form.aggregate([{
            $group: {
              _id: null,
              // Grouping by null to get a single result
              total: {
                $sum: {
                  $ifNull: ["$feeAmount", 0]
                }
              } // Sum the feeAmount field, defaulting to 0 if null
            }
          }]);
        case 6:
          totalFeeAmount = _context16.sent;
          overallFeeAmount = totalFeeAmount.length > 0 ? totalFeeAmount[0].total : 0; // Get the total fee amount or default to 0
          totalPaid = forms.reduce(function (acc, form) {
            return acc + (form.paidFee || 0);
          }, 0); // Fetch all expansive records and calculate total amount
          _context16.next = 7;
          return expansive.find({});
        case 7:
          expansives = _context16.sent;
          totalExpansiveAmount = expansives.reduce(function (acc, exp) {
            return acc + (exp.approvedAmount || 0);
          }, 0);
          adjustedTotalPaid = totalPaid - totalExpansiveAmount;
          res.status(200).json({
            success: true,
            data: {
              students: studentCount,
              forms: formCount,
              approvedForms: approvedFormCount,
              totalCollectedFees: totalCollected,
              // Include the total collected fees in the response
              overallFeeAmount: overallFeeAmount,
              BalanceAmount: adjustedTotalPaid,
              totalPaid: totalPaid,
              totalExpansiveAmount: totalExpansiveAmount
              // Include the overall fee amount of all forms
            }
          });
          _context16.next = 9;
          break;
        case 8:
          _context16.prev = 8;
          _t16 = _context16["catch"](0);
          console.error("Error getting counts:", _t16.message);
          res.status(500).json({
            success: false,
            message: "Failed to get counts"
          });
        case 9:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 8]]);
  }));
  return function (_x33, _x34) {
    return _ref16.apply(this, arguments);
  };
}();
exports.promoteForm = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
    var id, _req$body2, newClass, newFeeAmount, existingForm, newForm, _t17;
    return _regenerator["default"].wrap(function (_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          id = req.params.id; // Get the form ID from the request parameters
          _req$body2 = req.body, newClass = _req$body2.newClass, newFeeAmount = _req$body2.newFeeAmount; // Get the new class and fee amount from the request body
          // Validate the input
          if (!(!newClass || !newFeeAmount)) {
            _context17.next = 1;
            break;
          }
          return _context17.abrupt("return", res.status(400).json({
            success: false,
            message: "New class and fee amount are required."
          }));
        case 1:
          _context17.next = 2;
          return Form.findById(id);
        case 2:
          existingForm = _context17.sent;
          if (existingForm) {
            _context17.next = 3;
            break;
          }
          return _context17.abrupt("return", res.status(404).json({
            success: false,
            message: "Form not found."
          }));
        case 3:
          // Create a new form with duplicated admissionFor and feeAmount
          newForm = new Form(_objectSpread(_objectSpread({}, existingForm.toObject()), {}, {
            // Copy existing form data
            admissionFor: newClass,
            // Update admissionFor
            feeAmount: newFeeAmount,
            // Update feeAmount
            paidFee: 0,
            // Reset paidFee to 0
            feePayments: [],
            // Reset feePayments to an empty array
            _id: undefined,
            // Ensure a new ID is created
            createdAt: undefined,
            // Reset timestamps
            updatedAt: undefined
          })); // Save the new form
          _context17.next = 4;
          return newForm.save();
        case 4:
          res.status(201).json({
            success: true,
            message: "Form promoted successfully.",
            data: newForm
          });
          _context17.next = 6;
          break;
        case 5:
          _context17.prev = 5;
          _t17 = _context17["catch"](0);
          console.error("Error promoting form:", _t17.message);
          res.status(500).json({
            success: false,
            message: "Failed to promote form."
          });
        case 6:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 5]]);
  }));
  return function (_x35, _x36) {
    return _ref17.apply(this, arguments);
  };
}();