import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import Icon from './Icon';
import axios from 'axios';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-xl overflow-hidden tooltip-head">
                <div className="flex items-center justify-between p-2">
                    <div className="">{label}</div>
                    <Icon path="res-react-dash-options" className="w-2 h-2" />
                </div>
                <div className="tooltip-body text-center p-3">
                    <div className="text-white font-bold">Compression Ratio: {payload.find(p => p.dataKey === 'avgCompressionRatio')?.value}</div>
                    <div className="">Compression Time: {payload.find(p => p.dataKey === 'avgCompressionTime')?.value}s</div>
                    <div className="">Decompression Time: {payload.find(p => p.dataKey === 'avgDecompressionTime')?.value}s</div>
                </div>
            </div>
        );
    }

    return null;
};

const Graph = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/analytics/monthlyCompressionStats')
            .then(response => {
                if (response.data.msg === "success") {
                    const formattedData = response.data.monthlyStats.map(stat => ({
                        name: stat._id,
                        avgCompressionRatio: stat.avgCompressionRatio,
                        avgCompressionTime: stat.avgCompressionTime,
                        avgDecompressionTime: stat.avgDecompressionTime
                    }));
                    setData(formattedData);
                }
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    return (
        <div className="flex p-4 h-full flex-col">
            <div className="">
                <div className="flex items-center">
                    <div className="font-bold text-white">Compression Algorithms Comparison</div>
                    <div className="flex-grow" />
                    <Icon path="res-react-dash-graph-range" className="w-4 h-4" />
                    <div className="ml-2">Actual vs Compressed Size</div>
                    <div className="ml-6 w-5 h-5 flex justify-center items-center rounded-full icon-background">?</div>
                </div>
                <div className="font-bold ml-5">Time in millisecond</div>
            </div>
            <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={500} height={300} data={data}>
                        <defs>
                            <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                                <stop stopColor="#6B8DE3" />
                                <stop offset="1" stopColor="#7D1C8D" />
                            </linearGradient>
                            <linearGradient id="paint1_linear" x1="0" y1="0" x2="1" y2="0">
                                <stop stopColor="#82ca9d" />
                                <stop offset="1" stopColor="#8884d8" />
                            </linearGradient>
                            <linearGradient id="paint2_linear" x1="0" y1="0" x2="1" y2="0">
                                <stop stopColor="#ffc658" />
                                <stop offset="1" stopColor="#ff7300" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid horizontal={false} strokeWidth="1" stroke="#252525" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
                        <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Legend />
                        <Bar dataKey="avgCompressionRatio" fill="url(#paint0_linear)" />
                        <Bar dataKey="avgCompressionTime" fill="url(#paint1_linear)" />
                        <Bar dataKey="avgDecompressionTime" fill="url(#paint2_linear)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Graph;
