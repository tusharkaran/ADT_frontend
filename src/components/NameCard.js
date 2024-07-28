import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import clsx from 'clsx';
import Image from './Image';
import Icon from './Icon';

const NameCard = ({ name, position, totalTickets, tasksCompleted, avgCompressionTime, avgCompressionRatio }) => {
    const gradientId = 'paint0_linear';

    return (
        <div className="w-full p-2 lg:w-1/3">
            <div className="rounded-lg bg-card flex justify-between p-3 h-32">
                <div className="">
                    <div className="flex items-center">
                        {/* <Image path={`mock_faces_${imgId}`} className="w-10 h-10" /> */}
                        <div className="ml-2">
                            <div className="flex items-center">
                                <div className="mr-2 font-bold text-white">{name}</div>
                                <Icon path="res-react-dash-tick" />
                            </div>
                            <div className="text-sm">{position}</div>
                        </div>
                    </div>
                    <div className="text-sm mt-2">{`${tasksCompleted} from ${totalTickets} Tickets`}</div>
                    <svg className="w-44 mt-3" height="6" viewBox="0 0 200 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="200" height="6" rx="3" fill="#2D2D2D" />
                        <rect width={(tasksCompleted / totalTickets) * 200} height="6" rx="3" fill={`url(#${gradientId})`} />
                        <rect x="38" width="2" height="6" fill="#171717" />
                        <rect x="78" width="2" height="6" fill="#171717" />
                        <rect x="118" width="2" height="6" fill="#171717" />
                        <rect x="158" width="2" height="6" fill="#171717" />
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                                <stop stopColor="#8E76EF" />
                                <stop offset="1" stopColor="#3912D2" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div className="flex flex-col items-center">
                    {/* <Icon path={rise ? 'res-react-dash-bull' : 'res-react-dash-bear'} className="w-8 h-8" /> */}
                    <div className="text-sm">Compression Ratio</div>
                    <div className='text-green-500 text-lg font-bold'>
                        {avgCompressionRatio}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NameCard;
