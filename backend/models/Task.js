import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Urgent"],
    default: "Medium",
  },
  assignTo: {
    type: String,
    enum: ["all", "member"],
    default: "all",
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: false,
  },
  assignedToName: {
    type: String,
    required: true,
    default: "All Team Members",
  },
  dueDate: {
    type: Date,
  },
  assignedDate: {
    type: Date,
    default: Date.now,
  },
  completionStatus: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
