import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import Icon from './Icon';

const graphData = [
    { name: '5KB', ZSTD: 63, LZMA: 3, BROTLI: 2 },
    { name: '10KB', ZSTD: 10, LZMA: 7, BROTLI: 3 },
    { name: '15KB', ZSTD: 15, LZMA: 11, BROTLI: 6 },
    { name: '20KB', ZSTD: 15, LZMA: 16, BROTLI: 18 },
    { name: '25KB', ZSTD: 20, LZMA: 21, BROTLI: 22 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-xl overflow-hidden tooltip-head">
                <div className="flex items-center justify-between p-2">
                    <div className="">{label}</div>
                    <Icon path="res-react-dash-options" className="w-2 h-2" />
                </div>
                <div className="tooltip-body text-center p-3">
                    <div className="text-white font-bold">ZSTD: {payload.find(p => p.dataKey === 'ZSTD')?.value}KB</div>
                    <div className="">LZMA: {payload.find(p => p.dataKey === 'LZMA')?.value}KB</div>
                    <div className="">BROTLI: {payload.find(p => p.dataKey === 'BROTLI')?.value}KB</div>
                </div>
            </div>
        );
    }

    return null;
};

const Graph = () => {
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
                <div className="font-bold ml-5">Sizes in KB</div>
            </div>
            <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={500} height={300} data={graphData}>
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
                        <Line type="monotone" dataKey="ZSTD" stroke="url(#paint0_linear)" strokeWidth="3" dot={false} />
                        <Line type="monotone" dataKey="LZMA" stroke="url(#paint1_linear)" strokeWidth="3" dot={false} />
                        <Line type="monotone" dataKey="BROTLI" stroke="url(#paint2_linear)" strokeWidth="3" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Graph;
