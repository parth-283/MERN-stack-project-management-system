import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        status: {
            type: String,
            default: "To-Do"
        },
        priority: {
            type: String,
            default: "Low"
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        assignedTo: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        budget: {
            type: Number
        },
        spent: {
            type: Number
        },
        resources: [{
            type: String
        }],
        files: [{
            type: String
        }],
        tags: [{
            type: String
        }],
        dependencies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }],
        progress: {
            type: Number,
            default: 0
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        milestones: [{ name: String, dueDate: Date }],
        notifications: [{ message: String, timestamp: Date }],
        activityLog: [{ action: String, timestamp: Date }],
    },
    { timestamps: true }
);

const Project = new mongoose.model("Project", projectSchema);

export default Project;