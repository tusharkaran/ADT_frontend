import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tickets.css'; // Ensure the path is correct and matches the file name

const ActiveTickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        console.log('Fetching tickets...');
        axios.get('http://localhost:8000/api/ticket/getAllTickets')
            .then(response => {
                console.log('API Response:', response.data); // Log the API response
                response.data.forEach(ticket => {
                    console.log('Ticket _id:', ticket._id); // Log each ticket's _id
                });
                setTickets(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the tickets!', error);
            })
            .finally(() => {
                console.log('Finished fetching tickets.');
            });
    }, []);

    useEffect(() => {
        console.log('Tickets State:', tickets); // Log the tickets state
    }, [tickets]);

    return (
        <div className="container">
            <h2 className="header">Active Tickets</h2>
            <div className="total-tickets-box">
                <p className="total-tickets">Total Tickets: {tickets.length}</p>
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
                            <select className="select">
                                <option value="" disabled selected>Choose Compression Method</option>
                                <option value="A">ZSTD</option>
                                <option value="B">LZMA</option>
                                <option value="C">Brotli</option>
                            </select>
                            <button className="btn">Compress</button>
                        </div>
                    </div>
                )) : <p className="text-white">No active tickets found.</p>}
            </div>
        </div>
    );
};

export default ActiveTickets;
