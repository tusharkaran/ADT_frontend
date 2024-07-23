import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './Tickets.css'; // Ensure the path is correct and matches the file name

const ActiveTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTicketContent, setSelectedTicketContent] = useState('');
    const [selectedTicketID, setSelectedTicketID] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/ticket/getAllTickets')
            .then(response => {
                setTickets(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the tickets!', error);
            });
    }, []);

    const handleSelectTicket = (ticketID) => {
        setSelectedTickets(prevSelected =>
            prevSelected.includes(ticketID)
                ? prevSelected.filter(id => id !== ticketID)
                : [...prevSelected, ticketID]
        );
    };

    const handleCompress = (ticketID) => {
        axios.post('http://localhost:8000/api/ticket/brotliCompress', { ticketID })
            .then(response => {
                alert(`Ticket ${ticketID} compressed successfully!`);
            })
            .catch(error => {
                console.error('There was an error compressing the ticket!', error);
                alert(`Failed to compress ticket ${ticketID}.`);
            });
    };

    const handleCompressAll = () => {
        if (selectedTickets.length > 0) {
            axios.post('http://localhost:8000/api/ticket/compressAllTickets', { ticketIDs: selectedTickets })
                .then(response => {
                    alert('Tickets compressed successfully!');
                })
                .catch(error => {
                    console.error('There was an error compressing the tickets!', error);
                    alert('Failed to compress tickets.');
                });
        }
    };

    const handleView = (ticketID) => {
        axios.get(`http://localhost:8000/api/ticket/getTicket/${ticketID}`)
            .then(response => {
                const ticket = tickets.find(t => t._id === ticketID);
                setSelectedTicketContent(ticket.content);
                setSelectedTicketID(ticket.ticketID);
                setOpenDialog(true);
            })
            .catch(error => {
                console.error('There was an error fetching the ticket details!', error);
                alert('Failed to fetch ticket details.');
            });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedTicketContent('');
        setSelectedTicketID('');
    };

    return (
        <div className="container">
            <div className="header">
                <div className="total-tickets-box">
                    <p className="total-tickets">Total Tickets: {tickets.length}</p>
                </div>
                <button
                    className={`compress-all-btn ${selectedTickets.length > 0 ? 'enabled' : ''}`}
                    onClick={handleCompressAll}
                    disabled={selectedTickets.length === 0}
                >
                    Compress All
                </button>
            </div>
            <div className="space-y-4">
                {tickets.length > 0 ? tickets.map(ticket => (
                    <div key={ticket._id} className="ticket-card">
                        <input
                            type="checkbox"
                            className="select-checkbox"
                            checked={selectedTickets.includes(ticket._id)}
                            onChange={() => handleSelectTicket(ticket._id)}
                        />
                        <div className="info">
                            <div className="info-item">
                                <div className="key">TicketID:</div>
                                <div className="value">{ticket.ticketID}</div>
                            </div>
                            <div className="info-item">
                                <div className="key">Priority:</div>
                                <div className="value">{ticket.priority}</div>
                            </div>
                            <div className="info-item">
                                <div className="key">Assigned To:</div>
                                <div className="value">{ticket.assigned_to}</div>
                            </div>
                            <div className="info-item">
                                <div className="key">Created At:</div>
                                <div className="value">{new Date(ticket.createdAt).toLocaleString()}</div>
                            </div>
                            <div className="info-item">
                                <div className="key">Updated At:</div>
                                <div className="value">{new Date(ticket.updatedAt).toLocaleString()}</div>
                            </div>
                        </div>
                        <div className="btn-container">
                            <button className="btn view-btn" onClick={() => handleView(ticket._id)}>View</button>
                            <button className="btn" onClick={() => handleCompress(ticket._id)}>Compress</button>
                        </div>
                    </div>
                )) : <p className="text-white">No active tickets found.</p>}
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Ticket ID: {selectedTicketID}</DialogTitle>
                <DialogContent>
                    <p>{selectedTicketContent}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ActiveTickets;
