import React from 'react';
import { Typography, Paper, Button, Box, Container } from '@mui/material';
import { LockOpen, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // If you're using React Router

const RestrictedPage = ({ message = "You do not have permission to access this page." }) => {
    const navigate = useNavigate(); // If you use react-router-dom

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                    <LockOpen sx={{ fontSize: 60, color: 'error.main' }} />
                </Box>
                <Typography variant="h5" gutterBottom>
                    Access Restricted
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    {message}
                </Typography>
                <Box sx={{ marginTop: 3 }}>
                    <Button variant="contained" color="primary" startIcon={<ArrowBack />} onClick={handleGoBack}>
                        Go Back
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default RestrictedPage;