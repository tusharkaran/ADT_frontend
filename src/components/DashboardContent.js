import React, { useEffect, useState } from 'react';
import NameCard from './NameCard';
import Graph from './Graph';
import TopCountries from './TopCountries';
import Segmentation from './Segmentation';
import Satisfaction from './Satisfaction';
import AddComponent from './AddComponent';
import Icon from './Icon';
import IconButton from './IconButton';

const DashboardContent = ({ onSidebarHide }) => {
    const [compressionData, setCompressionData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/analytics/GetAlgoDetails')
            .then(response => response.json())
            .then(data => setCompressionData(Object.values(data)))
            .catch(error => console.error('Error fetching compression data:', error));
    }, []);

    return (
        <div className="flex w-full">
            <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
                <div className="w-full sm:flex p-2 items-end">
                    <div className="sm:flex-grow flex justify-between">
                        <div className="">
                            <div className="flex items-center">
                                <div className="text-3xl font-bold text-white">Compression Analysis</div>
                            </div>
                        </div>
                        <IconButton
                            icon="res-react-dash-sidebar-open"
                            className="block sm:hidden"
                            onClick={onSidebarHide}
                        />
                    </div>
                    <div className="w-full sm:w-56 mt-4 sm:mt-0 relative">
                        <Icon path="res-react-dash-search" className="w-5 h-5 search-icon left-3 absolute" />
                        <form action="#" method="POST">
                            <input
                                type="text"
                                name="company_website"
                                id="company_website"
                                className="pl-12 py-2 pr-2 block w-full rounded-lg border-gray-300 bg-card"
                                placeholder="search"
                            />
                        </form>
                    </div>
                </div>
                {compressionData && compressionData.map((algorithm) => (
                    <NameCard key={algorithm.name} {...algorithm} />
                ))}
                <div className="w-full p-2 lg:w-2/3">
                    <div className="rounded-lg bg-card sm:h-80 h-60">
                        <Graph />
                    </div>
                </div>
                <div className="w-full p-2 lg:w-1/3">
                    <div className="rounded-lg bg-card h-80">
                        <TopCountries />
                    </div>
                </div>
                <div className="w-full p-2 lg:w-1/3">
                    <div className="rounded-lg bg-card h-80">
                        <Segmentation />
                    </div>
                </div>
                <div className="w-full p-2 lg:w-1/3">
                    <div className="rounded-lg bg-card h-80">
                        <Satisfaction />
                    </div>
                </div>
                <div className="w-full p-2 lg:w-1/3">
                    <div className="rounded-lg bg-card overflow-hidden h-80">
                        <AddComponent />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
