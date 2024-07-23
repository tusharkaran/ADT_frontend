import React, { useState } from 'react';
import clsx from 'clsx';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import ActiveTickets from './ActiveTickets';
import Tickets from './Tickets';

const Dashboard = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [selectedSection, setSelectedSection] = useState('0');

    const renderContent = () => {
        switch (selectedSection) {
            case '0':
                return <DashboardContent />;
            case '1':
                return <ActiveTickets />;
            case '2':
                return <Tickets />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="flex">
            <Sidebar
                onSidebarHide={() => setShowSidebar(!showSidebar)}
                showSidebar={showSidebar}
                onSelectSection={setSelectedSection}
            />
            <div className={clsx('flex-grow', showSidebar ? 'ml-60' : 'ml-0')}>
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
