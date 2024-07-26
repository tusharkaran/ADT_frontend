import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import Icon from './Icon';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const AddComponent = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [ticketData, setTicketData] = useState({
        ticketID: uuidv4(),
        priority: '',
        state: '',
        assigned_to: '',
        content: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicketData({ ...ticketData, [name]: value });
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = () => {
        const newErrors = {};
        if (!validateEmail(ticketData.assigned_to)) {
            newErrors.assigned_to = 'Invalid email address';
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            axios.post('http://localhost:8000/api/ticket/createTicket', ticketData)
                .then(response => {
                    alert('Ticket created successfully!');
                    setOpenDialog(false);
                    setTicketData({
                        ticketID: uuidv4(),
                        priority: '',
                        state: '',
                        assigned_to: '',
                        content: ''
                    });
                })
                .catch(error => {
                    console.error('There was an error creating the ticket!', error);
                    alert('Failed to create ticket.');
                });
        }
    };

    return (
        <div>
            <div className="w-full h-20 add-component-head" />
            <div
                className="flex flex-col items-center"
                style={{
                    transform: "translate(0, -40px)",
                }}
            >
                <div
                    className=""
                    style={{
                        background: "#414455",
                        width: "80px",
                        height: "80px",
                        borderRadius: "999px",
                    }}
                >
                    <img
                        src="https://assets.codepen.io/3685267/res-react-dash-rocket.svg"
                        alt=""
                        className="w-full h-full"
                    />
                </div>
                {/* <div className="text-white font-bold mt-3">No Components Created Yet</div v> */}
                <div className="mt-1">Just click on the button to add tickets</div>
                <div
                    className="flex items-center p-3 mt-3"
                    style={{
                        background: "#2f49d1",
                        borderRadius: "15px",
                        padding: "8px 16px",
                        justifyContent: "center",
                        color: "white",
                        cursor: "pointer",
                    }}
                    onClick={() => setOpenDialog(true)}
                >
                    <Icon path="res-react-dash-add-component" className="w-5 h-5" />
                    <div className="ml-2">Add Tickets</div>
                    {/* <div
                        className="ml-2"
                        style={{
                            background: "#4964ed",
                            borderRadius: "15px",
                            padding: "4px 8px 4px 8px",
                        }}
                    >

                    </div> */}
                </div>
            </div>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add Ticket</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Ticket ID"
                        type="text"
                        fullWidth
                        value={ticketData.ticketID}
                        disabled
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Priority"
                        name="priority"
                        fullWidth
                        value={ticketData.priority}
                        onChange={handleChange}
                    >
                        <MenuItem value="HIGH">HIGH</MenuItem>
                        <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                        <MenuItem value="LOW">LOW</MenuItem>
                    </TextField>
                    <TextField
                        select
                        margin="dense"
                        label="State"
                        name="state"
                        fullWidth
                        value={ticketData.state}
                        onChange={handleChange}
                    >
                        <MenuItem value="OPEN">OPEN</MenuItem>
                        <MenuItem value="PENDING">PENDING</MenuItem>
                        <MenuItem value="SOLVED">SOLVED</MenuItem>
                        <MenuItem value="CLOSED">CLOSED</MenuItem>
                    </TextField>
                    <TextField
                        margin="dense"
                        label="Email ID"
                        type="email"
                        name="assigned_to"
                        fullWidth
                        value={ticketData.assigned_to}
                        onChange={handleChange}
                        error={!!errors.assigned_to}
                        helperText={errors.assigned_to}
                    />
                    <TextField
                        margin="dense"
                        label="Content"
                        type="text"
                        name="content"
                        fullWidth
                        multiline
                        rows={4}
                        value={ticketData.content}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary" variant="contained" fullWidth>
                        Create Ticket
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddComponent;
