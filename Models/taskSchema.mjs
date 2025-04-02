import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    status: { type: String, default: "pending" },
    isDeleted: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;