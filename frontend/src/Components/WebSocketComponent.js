import React, { useEffect, useState } from "react";

const WebSocketComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState(""); // State for new task name
    const [isConnected, setIsConnected] = useState(false); // State to track WebSocket connection
    const ws = React.useRef(null);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:5000");

        ws.current.onopen = () => {
            console.log("Connected to WebSocket server.");
            setIsConnected(true); // Update connection state to true
        };

        ws.current.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.success) {
                setTasks(response.tasks); // Update tasks in real-time
            }
        };

        ws.current.onclose = () => {
            console.log("Disconnected from WebSocket server.");
            setIsConnected(false); // Update connection state to false
        };

        return () => {
            ws.current.close(); // Cleanup WebSocket connection
        };
    }, []);

    // Fetch tasks only when WebSocket is connected
    useEffect(() => {
        if (isConnected) {
            ws.current.send(JSON.stringify({ type: "getTask" })); // Request task list
        }
    }, [isConnected]); // Trigger when connection state changes

    const addTask = () => {
        const newTask = {
            type: "addTask", // Specify the type of action
            taskId: Date.now().toString(), // Generate a unique ID
            taskName, // New task name from input
        };
        ws.current.send(JSON.stringify(newTask)); // Send to server
        setTaskName(""); // Clear the input field
    };

    const updateTaskStatus = (taskId, status) => {
        const taskUpdate = { type: "updateTask", taskId, status };
        ws.current.send(JSON.stringify(taskUpdate)); // Send update to server
    };

    const deleteTaskStatus = (taskId) => {
        const taskUpdate = { type: "deleteTask", taskId };
        ws.current.send(JSON.stringify(taskUpdate)); // Send update to server
    };

    return (
        <div>
            <h1>Task Management System</h1>

            <input
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />

            <button onClick={addTask}>Add Task</button>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <div>
                            <span> {task.status === 'completed' ? '🟢' : '🟡'} </span>
                            <span> {task.name} </span>
                        </div>
                        <div>
                            <button onClick={() => updateTaskStatus(task.id, task.status !== 'pending' ? "pending" : "completed")}>
                                Mark as {`${task.status !== 'pending' ? 'Pending' : 'Completed'}`}
                            </button>
                            <button onClick={() => deleteTaskStatus(task.id)}>
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketComponent;