import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  name: {
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
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: String,
    required: true,
    trim: true,
  },
  cvLink: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: false,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Shortlisted", "Hired", "Rejected"],
    default: "Pending",
  },
  addedToTeam: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Application = mongoose.model("Application", ApplicationSchema);
export default Application;
