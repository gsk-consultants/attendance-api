"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/formController"),
  submitStudent = _require.submitStudent,
  getStudentById = _require.getStudentById,
  getAllStudents = _require.getAllStudents,
  submitForm = _require.submitForm,
  getFormById = _require.getFormById,
  getAllForm = _require.getAllForm,
  deleteForm = _require.deleteForm,
  deleteStudent = _require.deleteStudent,
  getCounts = _require.getCounts,
  approveForm = _require.approveForm,
  getApprovedForms = _require.getApprovedForms,
  payForm = _require.payForm,
  getPaymentsForForm = _require.getPaymentsForForm,
  getAllPayments = _require.getAllPayments,
  getPaymentHistory = _require.getPaymentHistory,
  getOverallPayment = _require.getOverallPayment,
  promoteForm = _require.promoteForm,
  updateForm = _require.updateForm;
var _require2 = require("../controllers/followUpController"),
  addFollowUp = _require2.addFollowUp,
  getFollowUpsByEnquiryId = _require2.getFollowUpsByEnquiryId;
router.post("/submit", submitForm);
router.put("/update/:id", updateForm);
router.get("/form/:id", getFormById);
router.get("/form", getAllForm);
router.put("/form/approve/:id", approveForm);
router.get("/approved", getApprovedForms);
router["delete"]('/forms/:id', deleteForm);
router.get('/counts', getCounts);
router.get('/overall-payment', getOverallPayment);
router.put("/promote/:id", promoteForm);
router.post("/enquiry", submitStudent);
router.post('/:id/pay', payForm);
router.get('/:id/payments', getPaymentHistory);
router.get('/payments/:id', getPaymentsForForm);
router.get('/getbill', getAllPayments);
router.get("/students/:id", getStudentById);
router.get("/students", getAllStudents);
router["delete"]('/enq/:id', deleteStudent);
router.post('/follow-ups', addFollowUp);
router.get('/follow-ups/:enquiryId', getFollowUpsByEnquiryId);
module.exports = router;