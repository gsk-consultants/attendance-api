"use strict";

var mongoose = require("mongoose");
var formSchema = new mongoose.Schema({
  dateOfAdmission: {
    type: String
  },
  admissionFor: {
    type: String
  },
  particularsOfChild: {
    fullName: {
      type: String
    },
    surname: {
      type: String
    },
    nameUsedAtHome: {
      type: String
    },
    nationality: {
      type: String
    },
    dob: {
      type: String
    },
    gender: {
      type: String
    },
    language: {
      type: String
    },
    otherLanguage: {
      type: String,
      "default": ""
    },
    age: {
      type: String
    },
    blood: {
      type: String
    },
    houseNo: {
      type: String
    },
    buildingName: {
      type: String,
      "default": ""
    },
    streetName: {
      type: String
    },
    city: {
      type: String
    },
    pincode: {
      type: String
    }
  },
  particularsOfParents: {
    FatherName: {
      type: String
    },
    FatherQualification: {
      type: String
    },
    FatherOccupation: {
      type: String
    },
    FatherOrganisationName: {
      type: String
    },
    FatherSTDCodeRes: {
      type: String,
      "default": ""
    },
    FatherTelRes: {
      type: String,
      "default": ""
    },
    FatherSTDCodeOff: {
      type: String,
      "default": ""
    },
    FatherTelOff: {
      type: String,
      "default": ""
    },
    FatherMobile: {
      type: String
    },
    FatherEmail: {
      type: String
    },
    MotherName: {
      type: String
    },
    MotherQualification: {
      type: String
    },
    MotherOccupation: {
      type: String
    },
    MotherOrganisationName: {
      type: String
    },
    MotherSTDCodeRes: {
      type: String,
      "default": ""
    },
    MotherTelRes: {
      type: String,
      "default": ""
    },
    MotherSTDCodeOff: {
      type: String,
      "default": ""
    },
    MotherTelOff: {
      type: String,
      "default": ""
    },
    MotherMobile: {
      type: String
    },
    MotherEmail: {
      type: String
    }
  },
  childPersonalBackground: {
    PreviousSchooling: {
      type: String,
      "default": ""
    },
    characteristics: {
      type: [String],
      "default": []
    },
    PreviousSchoolingDetails: {
      type: String,
      "default": ""
    },
    Toilettrained: {
      type: String,
      "default": ""
    },
    Siblings: {
      Brothers: [{
        name: {
          type: String,
          "default": ""
        },
        age: {
          type: String,
          "default": ""
        }
      }, {
        name: {
          type: String,
          "default": ""
        },
        age: {
          type: String,
          "default": ""
        }
      }, {
        name: {
          type: String,
          "default": ""
        },
        age: {
          type: String,
          "default": ""
        }
      }],
      Sisters: [{
        name: {
          type: String,
          "default": ""
        },
        age: {
          type: String,
          "default": ""
        }
      }, {
        name: {
          type: String,
          "default": ""
        },
        age: {
          type: String,
          "default": ""
        }
      }, {
        name: {
          type: String,
          "default": ""
        },
        age: {
          type: String,
          "default": ""
        }
      }]
    },
    PreviousKalamKidsDetails: {
      type: String,
      "default": ""
    },
    PreviousKalamKids: {
      type: String,
      "default": ""
    },
    suffered: {
      type: String,
      "default": ""
    },
    surgery: {
      type: String,
      "default": ""
    },
    allergy: {
      type: String,
      "default": ""
    },
    phobias: {
      type: String,
      "default": ""
    },
    phobiasDetails: {
      type: String,
      "default": ""
    },
    medication: {
      type: String,
      "default": ""
    },
    medicationDetails: {
      type: String,
      "default": ""
    }
  },
  medicalRecord: {
    BCG: {
      type: String,
      "default": ""
    },
    "DPT (I, II, III)": {
      type: String,
      "default": ""
    },
    "Oral Polio vaccine (OPV)": {
      type: String,
      "default": ""
    },
    Measles: {
      type: String,
      "default": ""
    },
    MMR: {
      type: String,
      "default": ""
    },
    DT: {
      type: String,
      "default": ""
    },
    "HBV-Hepatitis (I, II, III)": {
      type: String,
      "default": ""
    },
    "Hi B (Meningitis-3 doses)": {
      type: String,
      "default": ""
    },
    Chickenpox: {
      type: String,
      "default": ""
    },
    Typhoid: {
      type: String,
      "default": ""
    },
    "Hepatitis A (2 doses)": {
      type: String,
      "default": ""
    }
  },
  Declarationparent: {
    signatureRef: {
      type: String,
      "default": ""
    },
    // base64 image
    date: {
      type: String,
      "default": ""
    },
    acknowledgmentName: {
      type: String,
      "default": ""
    },
    acknowledgmentSignatureRef: {
      type: String,
      "default": ""
    },
    // base64 im
    volunteerJob: {
      type: String,
      "default": false
    },
    specialEventsCost: {
      type: String,
      "default": false
    },
    attendMeetings: {
      type: String,
      "default": false
    }
  },
  isApproved: {
    type: Boolean,
    "default": false
  },
  invoiceNo: {
    type: String,
    "default": ""
  },
  feeAmount: {
    type: Number,
    "default": ""
  },
  paidFee: {
    type: Number,
    "default": 0
  },
  feePayments: [{
    _id: {
      type: String
    },
    cashNo: {
      type: String,
      "default": ""
    },
    amount: {
      type: Number
    },
    paidBy: {
      type: String
    },
    amountInWords: {
      type: String,
      "default": ""
    },
    cashReceivedFrom: {
      type: String,
      "default": ""
    },
    relationshipName: {
      type: String,
      "default": ""
    },
    chequeDetails: {
      type: String,
      "default": ""
    },
    qrTransactionId: {
      type: String,
      "default": ""
    },
    bankTransferId: {
      type: String,
      "default": ""
    },
    cashDenominations: {
      type: String,
      "default": ""
    },
    receiverName: {
      type: String,
      "default": ""
    },
    date: {
      type: Date,
      "default": Date.now
    }
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model("Form", formSchema);