import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './Tickets.css'; // Ensure the path is correct and matches the file name

const ArchivedTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTicketContent, setSelectedTicketContent] = useState('');
    const [selectedTicketID, setSelectedTicketID] = useState('');

    const fetchTickets = () => {
        axios.get('http://localhost:8000/api/ticket/getAllArchivedTickets')
            .then(response => {
                setTickets(response.data.tickets);
                console.log('Fetched tickets:', response.data.tickets);
            })
            .catch(error => {
                console.error('There was an error fetching the tickets!', error);
            });
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleUncompressAndView = (ticketID) => {
        axios.get(`http://localhost:8000/api/ticket/getArchivedTicket/ticketid/${ticketID}`)
            .then(response => {
                fetchTickets(); // Refresh the list
                const ticket = response.data.data;
                setSelectedTicketContent(ticket.data.content);
                setSelectedTicketID(ticket.ticketID);
                setOpenDialog(true);
            })
            .catch(error => {
                console.error('There was an error uncompressing the ticket!', error);
                alert(`Failed to uncompress ticket ${ticketID}.`);
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
            </div>
            <div className="space-y-4">
                {tickets.length > 0 ? tickets.map(ticket => (
                    <div key={ticket._id} className="ticket-card">
                        <div className="info">
                            <div className="info-item">
                                <div className="key">TicketID:</div>
                                <div className="value">{ticket.ticketID}</div>
                            </div>
                            <div className="info-item">
                                <div className="key">Created At:</div>
                                <div className="value">{new Date(ticket.createdAt).toLocaleString()}</div>
                            </div>
                            <div className="info-item">
                                <div className="key">Updated At:</div>
                                <div className="value">{new Date(ticket.updatedAt).toLocaleString()}</div>
                            </div>
                            <div className="info-item">
                                <div className="key">Original Size:</div>
                                <div className="value">{ticket.originalSize}</div>
                            </div>
                            <div className="info-item">
                                <div className="key">Compressed Size:</div>
                                <div className="value">{ticket.compressedSize}</div>
                            </div>
                        </div>
                        <div className="btn-container">
                            <button className="btn" onClick={() => handleUncompressAndView(ticket.ticketID)}>Uncompress and View</button>
                        </div>
                    </div>
                )) : <p className="text-white">No archived tickets found.</p>}
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

export default ArchivedTickets;
