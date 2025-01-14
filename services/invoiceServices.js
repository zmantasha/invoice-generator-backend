const InvoiceModel = require("../models/InvoiceModel");

class InvoiceServices {

  // Create a new invoice
  createInvoice = async (invoiceData) => {
    try {

      const invoice = new InvoiceModel(invoiceData);
      await invoice.save();
      // Use the static method to populate userId
      // const populatedInvoice = await InvoiceModel.populateUser(invoice._id);
      // return populatedInvoice;
       return invoice;
      
    } catch (error) {
      throw error;
    }
  };
  // Get all invoices
  getAllInvoices = async () => {
    try {
      // const getAllInvoice = await InvoiceModel.find().populate("userId", "fullName email");
      const getAllInvoice = await InvoiceModel.find()
      return getAllInvoice;
    } catch (error) {
      throw error;
    }
  };
  // Get invoice by ID
  getInvoiceById = async (id) => {
    try {
      // const getInvoicebyId = await InvoiceModel.findById(id).populate("userId", "fullName email");
      const getInvoicebyId = await InvoiceModel.findById(id).populate("userId", "fullName email logo");;
      return getInvoicebyId;
    } catch (error) {
      throw error;
    }
  };


  getInvoiceByuserId=async(userId)=>{
    console.log(userId)
    try {
      const getInvoicebyuserId = await InvoiceModel.find({userId: userId })
      return getInvoicebyuserId;
    } catch (error) {
      throw error;
    }
  }

  // Update invoice
  updateInvoice = async (id, body) => {
    try {
      console.log(body)
      const updateinvoice = await InvoiceModel.findByIdAndUpdate({ _id: id }, 
        body, 
        {new: true}
      ).populate("userId", "fullName email");
      return updateinvoice;
    } catch (error) {
      throw error;
    }
  };


  // update invoice
  updateInvoicestatus=async(id,status)=>{
    try {
      console.log(status)
      const updateinvoice = await InvoiceModel.findByIdAndUpdate({ _id: id }, 
        {status:status}, 
        {new: true}
      )
      return updateinvoice;
    } catch (error) {
      throw error;
    }
  }
  // Delete invoice
  deleteInvoice = async (id) => {
    try {
      const deleteinvoice = await InvoiceModel.findByIdAndDelete(id);
      return deleteinvoice;
    } catch (error) {
      throw error;
    }
  };

}

module.exports = InvoiceServices;
