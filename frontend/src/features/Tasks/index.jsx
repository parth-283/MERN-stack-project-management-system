// Tasks.js
import React, { useState, useEffect } from 'react';
import './Tasks.scss';
import { Add, Edit, Delete, CheckCircle, AssignmentInd, Event, PriorityHigh } from '@mui/icons-material';
import {
    Modal, Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip,
} from '@mui/material';

const Tasks = () => {
    const [tasks, setTasks] = useState([]); // Fetch from API
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [selectedTask, setSelectedTask] = useState(null);
    const [formTaskName, setFormTaskName] = useState('');
    const [formTaskDescription, setFormTaskDescription] = useState('');
    const [formAssignedTo, setFormAssignedTo] = useState('');
    const [formDueDate, setFormDueDate] = useState('');
    const [formPriority, setFormPriority] = useState('');
    const [formStatus, setFormStatus] = useState('');

    useEffect(() => {
        // Fetch tasks from API and setTasks(fetchedTasks)
        setTasks([
            { id: 1, name: 'Design UI', description: 'Design user interface for landing page', assignedTo: 'Alice', dueDate: '2023-12-15', priority: 'High', status: 'In Progress' },
            { id: 2, name: 'Develop API', description: 'Develop REST API endpoints', assignedTo: 'Bob', dueDate: '2023-12-20', priority: 'Medium', status: 'Completed' },
            { id: 3, name: 'Write Documentation', description: 'Write API documentation', assignedTo: 'Charlie', dueDate: '2023-12-25', priority: 'Low', status: 'Pending' },
        ]);
    }, []);

    const openModal = (type, task = null) => {
        setModalType(type);
        setSelectedTask(task);
        setFormTaskName(task ? task.name : '');
        setFormTaskDescription(task ? task.description : '');
        setFormAssignedTo(task ? task.assignedTo : '');
        setFormDueDate(task ? task.dueDate : '');
        setFormPriority(task ? task.priority : '');
        setFormStatus(task ? task.status : '');
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedTask(null);
    };

    const handleSaveTask = () => {
        const newTask = {
            id: selectedTask ? selectedTask.id : Date.now(),
            name: formTaskName,
            description: formTaskDescription,
            assignedTo: formAssignedTo,
            dueDate: formDueDate,
            priority: formPriority,
            status: formStatus,
        };

        if (modalType === 'add') {
            setTasks([...tasks, newTask]); // Send to API
        } else {
            setTasks(tasks.map((task) => (task.id === newTask.id ? newTask : task))); // Send to API
        }
        closeModal();
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id)); // Send to API
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="tasks-container">
            <header className="tasks-header">
                <h1>Tasks Management</h1>
                <Button variant="contained" startIcon={<Add />} onClick={() => openModal('add')}>
                    Add Task
                </Button>
            </header>
            <main className="tasks-main">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Assigned To</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Priority</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell>{task.name}</TableCell>
                                    <TableCell>{task.description}</TableCell>
                                    <TableCell>{task.assignedTo}</TableCell>
                                    <TableCell>{task.dueDate}</TableCell>
                                    <TableCell><Chip label={task.priority} color={task.priority === 'High' ? 'error' : task.priority === 'Medium' ? 'warning' : 'info'} size="small" /></TableCell>
                                    <TableCell><Chip label={task.status} color={task.status === 'Completed' ? 'success' : task.status === 'In Progress' ? 'primary' : 'default'} size="small" /></TableCell>
                                    <TableCell>
                                        <Button onClick={() => openModal('edit', task)}><Edit /></Button>
                                        <Button onClick={() => handleDeleteTask(task.id)}><Delete /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </main>

            <Modal open={modalIsOpen} onClose={closeModal}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">
                        {modalType === 'add' ? 'Add New Task' : 'Edit Task'}
                    </Typography>
                    <TextField label="Name" value={formTaskName} onChange={(e) => setFormTaskName(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Description" value={formTaskDescription} onChange={(e) => setFormTaskDescription(e.target.value)} fullWidth margin="normal" multiline rows={4} />
                    <TextField label="Assigned To" value={formAssignedTo} onChange={(e) => setFormAssignedTo(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Due Date" type="date" value={formDueDate} onChange={(e) => setFormDueDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="priority-label">Priority</InputLabel>
                        <Select labelId="priority-label" value={formPriority} onChange={(e) => setFormPriority(e.target.value)} label="Priority">
                            <MenuItem value="High">High</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select labelId="status-label" value={formStatus} onChange={(e) => setFormStatus(e.target.value)} label="Status">
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="contained" onClick={handleSaveTask} sx={{ mr: 1 }}>Save</Button>
                        <Button variant="outlined" onClick={closeModal}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default Tasks;