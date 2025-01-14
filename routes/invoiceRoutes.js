const express = require("express");
const InvoiceController = require("../controllers/invoiceController");
const validateSchema = require("../middleware/validatemiddleware");
const { invoiceValidationSchema } = require("../validation/invoiceValidation");
const router= express.Router()

const validateInvoice= validateSchema(invoiceValidationSchema)

// Routes
router.post("/invoices",validateInvoice, InvoiceController.createInvoice);
router.get("/invoices", InvoiceController.getAllInvoices);
router.get("/invoices/:id", InvoiceController.getInvoiceById);
router.get("/invoices/userId/:id", InvoiceController.getInvoicebyUserId);
router.put("/invoices/:id",validateInvoice, InvoiceController.updateInvoice);
router.delete("/invoices/:id", InvoiceController.deleteInvoice);
router.put("/invoices/:id/status", InvoiceController.updateInvoicestatus);



module.exports= router