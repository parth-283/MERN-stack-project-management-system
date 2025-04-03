// Teams.js
import React, { useState, useEffect } from 'react';
import './Teams.scss';
import { Add, Delete, Edit } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [formTeamName, setFormTeamName] = useState('');
    const [formTeamManager, setFormTeamManager] = useState('');
    const [formTeamMembers, setFormTeamMembers] = useState('');

    useEffect(() => {
        // Fetch teams from API and setTeams(fetchedTeams)
        setTeams([
            { id: 1, name: 'Development Team', members: ['Alice', 'Bob', 'Charlie'], manager: 'David' },
            { id: 2, name: 'Marketing Team', members: ['Eve', 'Frank', 'Grace'], manager: 'Hannah' },
            { id: 3, name: 'Design Team', members: ['Ivy', 'Jack'], manager: 'Kelly' },
        ]);
    }, []);

    const openModal = (type, team = null) => {
        setModalType(type);
        setSelectedTeam(team);
        setFormTeamName(team ? team.name : '');
        setFormTeamManager(team ? team.manager : '');
        setFormTeamMembers(team ? team.members.join(', ') : '');
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedTeam(null);
    };

    const handleSaveTeam = () => {
        const newTeam = {
            id: selectedTeam ? selectedTeam.id : Date.now(),
            name: formTeamName,
            manager: formTeamManager,
            members: formTeamMembers.split(', ').map((member) => member.trim()),
        };

        if (modalType === 'add') {
            setTeams([...teams, newTeam]); // Send to API
        } else {
            setTeams(teams.map((team) => (team.id === newTeam.id ? newTeam : team))); // Send to API
        }
        closeModal();
    };

    const handleDeleteTeam = (id) => {
        setTeams(teams.filter((team) => team.id !== id)); // Send to API
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="teams-container">
            <header className="teams-header">
                <h1>Teams Management</h1>
                <Button variant="contained" startIcon={<Add />} onClick={() => openModal('add')}>
                    Add Team
                </Button>
            </header>
            <main className="teams-main">
                <section className="teams-list">
                    <h2>Existing Teams</h2>
                    <ul className="team-list">
                        {teams.map((team) => (
                            <li key={team.id} className="team-item">
                                <div className="team-name">{team.name}</div>
                                <div className="team-details">
                                    <p>Manager: {team.manager}</p>
                                    <p>Members: {team.members.join(', ')}</p>
                                </div>
                                <div className="team-actions">
                                    <Button onClick={() => openModal('edit', team)}><Edit /></Button>
                                    <Button onClick={() => handleDeleteTeam(team.id)}><Delete /></Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            <Modal open={modalIsOpen} onClose={closeModal}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">
                        {modalType === 'add' ? 'Add New Team' : 'Edit Team'}
                    </Typography>
                    <TextField label="Team Name" value={formTeamName} onChange={(e) => setFormTeamName(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Manager" value={formTeamManager} onChange={(e) => setFormTeamManager(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Members (comma separated)" value={formTeamMembers} onChange={(e) => setFormTeamMembers(e.target.value)} fullWidth margin="normal" />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="contained" onClick={handleSaveTeam} sx={{ mr: 1 }}>Save</Button>
                        <Button variant="outlined" onClick={closeModal}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default Teams;