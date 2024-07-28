import React, { useEffect, useState } from 'react';
import Icon from './Icon';

const TicketAnalysis = () => {
    const [countryData, setCountryData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/analytics/GetAlgoDetails')
            .then(response => response.json())
            .then(data => {
                // Map the response data to the structure expected by the component
                const formattedData = Object.values(data).map((algo, index) => ({
                    id: index + 1,
                    name: algo.name,
                    rise: algo.avgCompressionTime < 15000, // example condition, adjust as needed
                    compressionTime: algo.avgCompressionTime,
                    decompressionTime: algo.avgDecompressionTime,
                }));
                setCountryData(formattedData);
            })
            .catch(error => console.error('Error fetching country data:', error));
    }, []);

    return (
        <div className="flex p-4 flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <div className="text-white font-bold">Compression & Decompression Time</div>
                <Icon path="res-react-dash-plus" className="w-5 h-5" />
            </div>
            <div className="flex font-bold mb-2">
                {/* <div className="w-12">ID</div> */}
                <div className="flex-grow ml-2">Compression Algorithm</div>
                <div className="w-40">Compression Time</div>
                <div className="w-40">Decompression Time</div>
                <div className="w-12"></div>
                <div className="w-6"></div>
            </div>
            {countryData.map(({ id, name, rise, compressionTime, decompressionTime }) => (
                <div className="flex items-center mt-3" key={id}>
                    {/* <div className="w-12">{id}</div> */}
                    <div className="flex-grow ml-2">{name}</div>
                    <div className="w-40">{`${compressionTime.toLocaleString()} ms`}</div>
                    <div className="w-40 ml-4">{`${decompressionTime.toLocaleString()} ms`}</div>
                    {/* <Icon path={rise ? "res-react-dash-country-up" : "res-react-dash-country-down"} className="w-4 h-4 mx-3" />
                    <Icon path="res-react-dash-options" className="w-2 h-2" /> */}
                </div>
            ))}
            <div className="flex-grow" />
            <div className="flex justify-center">
                <div>Check All</div>
            </div>
        </div>
    );
};

export default TicketAnalysis;
