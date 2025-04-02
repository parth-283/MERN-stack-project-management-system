import Task from "../Models/taskSchema.mjs";

const webSocketHandler = (ws) => {
    ws.on("message", async (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === "getTask") {
                // Fetch updated task list from MongoDB
                const tasks = await Task.find({ isDeleted: false });

                ws.send(JSON.stringify({ success: true, tasks }));
            } else if (data.type === "addTask") {
                // Add a new task to MongoDB
                const newTask = new Task({
                    id: data.taskId,
                    name: data.taskName,
                });
                await newTask.save();

                // Fetch updated task list from MongoDB
                const tasks = await Task.find({ isDeleted: false });

                ws.send(JSON.stringify({ success: true, tasks }));
            } else if (data.type === "updateTask") {
                // Update an existing task in MongoDB
                await Task.findOneAndUpdate(
                    { id: data.taskId, isDeleted: false },
                    { status: data.status }
                );

                // Fetch updated task list from MongoDB
                const tasks = await Task.find({ isDeleted: false });

                ws.send(JSON.stringify({ success: true, tasks }));
            } else if (data.type === "deleteTask") {
                // Update an existing task in MongoDB
                await Task.findOneAndUpdate(
                    { id: data.taskId },
                    { isDeleted: true }
                );

                // Fetch updated task list from MongoDB
                const tasks = await Task.find({ isDeleted: false });

                ws.send(JSON.stringify({ success: true, tasks }));
            }
        } catch (error) {
            console.error(`Invalid WebSocket message: ${error.message}`);
            ws.send(
                JSON.stringify({
                    success: false,
                    error: "Invalid data format or database error.",
                })
            );
        }
    });

    ws.on("close", () => {
        console.log("Client disconnected from WebSocket.");
    });
};

export default webSocketHandler;