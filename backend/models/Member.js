import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  hiredDate: {
    type: Date,
    default: Date.now,
  },
});

const Member = mongoose.model("Member", MemberSchema);
export default Member;
