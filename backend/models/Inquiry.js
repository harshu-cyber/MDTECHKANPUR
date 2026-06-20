import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: false,
    trim: true,
  },
  contactName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  productId: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "replied", "closed"],
    default: "pending",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Inquiry = mongoose.model("Inquiry", InquirySchema);
export default Inquiry;
