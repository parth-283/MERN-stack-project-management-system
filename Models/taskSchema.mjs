import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, // Remove leading and trailing whitespace
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed', 'cancelled'], // Restrict to specific values
        default: 'pending',
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    dueDate: {
        type: Date,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId, // Reference to a User model (if you have one)
        ref: 'User', // Name of the referenced model
        default: null, // task can be unassigned.
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    attachments: [{
        type: String,
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }]
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;