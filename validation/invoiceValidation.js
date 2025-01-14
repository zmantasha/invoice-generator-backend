const Joi = require("joi");

// Joi schema for invoice validation
const invoiceValidationSchema = Joi.object({
  userId: Joi.string(), 
  senderDetails: Joi.object({
    logo: Joi.string().allow("", null),
    name: Joi.string().required(),
    address: Joi.string().required(),
    // email: Joi.string().email(),
    // phone: Joi.string().min(10).max(15),
  }),
  
  recipientDetails: Joi.object({
    billTo: Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
      // email: Joi.string().email(),
      // phone: Joi.string().min(10).max(15),
    }),
    
    shipTo: Joi.object({
      name: Joi.string().allow("", null),
      address: Joi.string().allow("", null),
      // email: Joi.string().email().allow("", null),
      // phone: Joi.string().min(10).max(15).allow("", null),
    }).allow(null),  // `shipTo` is optional, can be null
  }).required(),

  invoiceDetails: Joi.object({
    number: Joi.string().required(),
    date: Joi.date().required(),
    dueDate: Joi.date().allow(null),
    paymentTerms: Joi.string().allow("", null),
    poNumber: Joi.string().allow("", null),
    currency: Joi.string().valid("USD", "EUR", "GBP","INR").default("USD"),
  }),

  items: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        description: Joi.string(),
        quantity: Joi.number().required().min(1),
        rate: Joi.number().required().min(0),
        amount: Joi.number().required().min(0),
      })
    )
    .min(1) // Ensure at least one item
    ,

  totals: Joi.object({
    subtotal: Joi.number().required().min(0),
    tax: Joi.number().min(0).allow(null),
    taxRate: Joi.number().min(0).allow(null),
    shipping: Joi.number().min(0).allow(null),
    discount: Joi.number().min(0).allow(null),
    discountType: Joi.string().valid("percentage", "flat").default("percentage"),
    shippingType: Joi.string().valid("percentage", "flat").default("percentage"),
    total: Joi.number().required().min(0),
    amountPaid: Joi.number().min(0).allow(null),
    balanceDue: Joi.number().min(0).required(),
  }).required(),

  notes: Joi.string().allow("", null),
  terms: Joi.string().allow("", null),
  status: Joi.string().allow("", null),
});

module.exports = { invoiceValidationSchema };
