import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import Icon from './Icon';

const pi = Math.PI;
const tau = 2 * pi;

const map = (value, sMin, sMax, dMin, dMax) => {
    return dMin + ((value - sMin) / (sMax - sMin)) * (dMax - dMin);
};

const Size = () => {
    const [totalValue, setTotalValue] = useState(1024);
    const [actualValue, setActualValue] = useState(423);
    const [percentageValue, setPercentageValue] = useState(40);

    useEffect(() => {
        fetch('http://localhost:8000/api/analytics/getCompressionStats')
            .then(response => response.json())
            .then(data => {
                setTotalValue(data.totalOriginalSize);
                setActualValue(data.totalCompressedSize);
                setPercentageValue(data.percentageSaved);
            })
            .catch(error => console.error('Error fetching compression stats:', error));
    }, []);

    const dashArray = 785.4;
    const dashOffsetValue = dashArray * (1 - actualValue / totalValue);

    const { dashOffset } = useSpring({
        dashOffset: dashOffsetValue,
        from: { dashOffset: dashArray },
        config: config.molasses,
    });

    return (
        <div className="p-4 h-full">
            <div className="flex justify-between items-center">
                <div className="text-white font-bold">Compressed Size</div>
                <Icon path="res-react-dash-options" className="w-2 h-2" />
            </div>
            {/* <div className="mt-3">From all projects</div> */}
            <div className="flex items-center mt-3">
                <div className="ml-2">Actual Size</div>
                <div className="flex-grow"></div>
                <div className="">{totalValue} bytes</div>
                <img src="https://assets.codepen.io/3685267/res-react-dash-options.svg" alt="" className="w-2 h-2" />
            </div>
            <div className="flex items-center mt-3">
                <div className="ml-2">Compressed Size</div>
                <div className="flex-grow"></div>
                <div className="">{actualValue} bytes</div>
                <img src="https://assets.codepen.io/3685267/res-react-dash-options.svg" alt="" className="w-2 h-2" />
            </div>
            <div className="flex justify-center">
                <svg viewBox="0 0 700 380" fill="none" width="300" xmlns="http://www.w3.org/2000/svg" id="svg">
                    <path d="M100 350C100 283.696 126.339 220.107 173.223 173.223C220.107 126.339 283.696 100 350 100C416.304 100 479.893 126.339 526.777 173.223C573.661 220.107 600 283.696 600 350" stroke="#2d2d2d" strokeWidth="40" strokeLinecap="round" />
                    <animated.path d="M100 350C100 283.696 126.339 220.107 173.223 173.223C220.107 126.339 283.696 100 350 100C416.304 100 479.893 126.339 526.777 173.223C573.661 220.107 600 283.696 600 350" stroke="#2f49d0" strokeWidth="40" strokeLinecap="round" strokeDasharray={dashArray} strokeDashoffset={dashOffset} id="svgPath" className="svgPath" />
                    <animated.circle cx={dashOffset.interpolate((x) => 350 + 250 * Math.cos(map(x, dashArray, 0, pi, tau)))} cy={dashOffset.interpolate((x) => 350 + 250 * Math.sin(map(x, dashArray, 0, pi, tau)))} r="12" fill="#fff" />
                    <circle cx="140" cy="350" r="5" fill="#2f49d0" />
                    <circle cx="144.5890038459008" cy="306.3385449282706" r="5" fill="#2f49d0" />
                    <circle cx="158.15545389505382" cy="264.58530495408195" r="5" fill="#2f49d0" />
                    <circle cx="180.10643118126103" cy="226.56509701858067" r="5" fill="#2f49d0" />
                    <circle cx="209.48257266463972" cy="193.93958664974724" r="5" fill="#2f49d0" />
                    <circle cx="244.9999999999999" cy="168.1346652052679" r="5" fill="#2f49d0" />
                    <circle cx="285.10643118126103" cy="150.27813157801776" r="5" fill="#2f49d0" />
                    <circle cx="328.0490227137926" cy="141.15040197266262" r="5" fill="#2f49d0" />
                    <circle cx="371.95097728620715" cy="141.1504019726626" r="5" fill="#2f49d0" />
                    <circle cx="414.8935688187389" cy="150.27813157801774" r="5" fill="#2f49d0" />
                    <circle cx="454.9999999999999" cy="168.1346652052678" r="5" fill="#2f49d0" />
                    <circle cx="490.51742733536014" cy="193.93958664974713" r="5" fill="#2f49d0" />
                    <circle cx="519.8935688187389" cy="226.5650970185806" r="5" fill="#2f49d0" />
                    <circle cx="541.8445461049462" cy="264.58530495408183" r="5" fill="#2f49d0" />
                    <circle cx="555.4109961540992" cy="306.33854492827044" r="5" fill="#2f49d0" />
                    <circle cx="560" cy="349.99999999999994" r="5" fill="#2f49d0" />
                    <path d="M349.292 375C395.845 375 433.583 337.261 433.583 290.708C433.583 244.155 395.845 206.417 349.292 206.417C302.739 206.417 265 244.155 265 290.708C265 337.261 302.739 375 349.292 375Z" fill="white" />
                    <path d="M349.292 358.708C386.847 358.708 417.292 328.264 417.292 290.708C417.292 253.153 386.847 222.708 349.292 222.708C311.736 222.708 281.292 253.153 281.292 290.708C281.292 328.264 311.736 358.708 349.292 358.708Z" fill="#D2D6E7" />
                </svg>
            </div>
            <div className="flex justify-center">
                <div className="flex justify-between mt-2" style={{ width: '300px' }}>
                    <div className="" style={{ width: '50px', paddingLeft: '16px' }}>0%</div>
                    <div className="" style={{ width: '150px', textAlign: 'center' }}>
                        <div className="font-bold" style={{ color: '#2f49d1', fontSize: '18px' }}>{percentageValue}%</div>
                    </div>
                    <div className="" style={{ width: '50px' }}>100%</div>
                </div>
            </div>
        </div>
    );
};

export default Size;
