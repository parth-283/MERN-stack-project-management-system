import Project from "../Models/projectSchema.mjs";

const addProject = async (req, res) => {
    try {
        const { name, description, owner } = req.body

        const newProject = new Project({ name, description, owner })

        const project = await newProject.save()

        res.status(200).json({ data: project, message: "New project add successfully.", isSuccessful: true });
    } catch (error) {
        console.log(`Error on add new project request. Error: ${JSON.stringify(error)}`.underline.red);
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

const allProjects = async (req, res) => {
    try {
        const projects = await Project.find({ isDeleted: false }).populate("user").populate("assignedTo")

        res.status(200).json({ data: projects, message: "Project list get successfully.", isSuccessful: true });
    } catch (error) {
        console.log(`Error on get project list request. Error: ${JSON.stringify(error)}`.underline.red);
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

const getProjectsByTask = async (req, res) => {
    try {
        const { id } = req.query

        const projects = await Project.find({ _id: id, isDeleted: false }).populate("user").populate("assignedTo")

        res.status(200).json({ data: projects, message: "Project list get successfully.", isSuccessful: true });
    } catch (error) {
        console.log(`Error on get project list by tasks request. Error: ${JSON.stringify(error)}`.underline.red);
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

const updateProject = async (req, res) => {
    try {
        const { id } = req.query

        const projects = await Project.findOneAndUpdate({ _id: id, isDeleted: false }, { ...req.body }, { new: true, runValidators: true })

        res.status(200).json({ data: projects, message: "Update project successfully.", isSuccessful: true });
    } catch (error) {
        console.log(`Error on update project request. Error: ${JSON.stringify(error)}`.underline.red);
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.query

        const projects = await Project.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true, runValidators: true })

        res.status(200).json({ data: projects, message: "Removed project successfully.", isSuccessful: true });
    } catch (error) {
        console.log(`Error on removed project request. Error: ${JSON.stringify(error)}`.underline.red);
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

export default {
    addProject,
    allProjects,
    getProjectsByTask,
    updateProject,
    deleteProject,
}