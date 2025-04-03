import Task from "../Models/taskSchema.mjs";


const addTask = async (req, res) => {
    try {
        const { title, description, createdBy } = req.body

        const newTask = new Task({ title, description, createdBy })

        const project = await newTask.save()

        res.status(200).json({ data: project, message: "New Task add successfully.", isSuccessful: true });
    } catch (error) {
        console.log(`Error on add new Task request. Error: ${JSON.stringify(error)}`.underline.red);
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

const allTask = async (req, res) => {
    try {
        const Tasks = await Task.find({ isDeleted: false }).populate("createdBy").populate("assignedTo")

        if (!Tasks || Tasks.length == 0) {
            const error = new Error('Task not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({ data: Tasks, message: "Get task successfully.", isSuccessful: true });
    } catch (error) {
        console.log(`Error on add new Task request. Error: ${JSON.stringify(error)}`.underline.red);
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params

        const response = await Task.findOneAndUpdate({ _id: id, isDeleted: false }, { ...req.body }, { isNew: true, runValidators: true })

        if (!response) {
            const error = new Error('Task not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({ message: "Task updated successfully.", isSuccessful: true });
    } catch (error) {
        console.log(`Error on update Task request. Error: ${JSON.stringify(error)}`.underline.red);
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params

        const response = await Task.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { isNew: true, runValidators: true })

        if (!response) {
            const error = new Error('task not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({ message: "Task deleted successfully.", isSuccessful: true });
    } catch (error) {
        console.log(`Error on delete Task request. Error: ${JSON.stringify(error)}`.underline.red);
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

export default {
    addTask,
    allTask,
    updateTask,
    deleteTask
}