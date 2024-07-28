import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Piechart = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/analytics/handleGetBothCollectionCount');
                const data = await response.json();
                const totalTickets = data.totalTicket;
                const totalArchiveTickets = data.totalArchiveTickets;
                const totalNormalTickets = totalTickets + totalArchiveTickets;

                const archivePercentage = (totalArchiveTickets / totalNormalTickets) * 100;
                const normalPercentage = (totalTickets / totalNormalTickets) * 100;

                setChartData([
                    { name: 'Archival Tickets', y: archivePercentage },
                    { name: 'Normal Ticket', sliced: true, selected: true, y: normalPercentage }
                ]);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const chartOptions = {
        chart: {
            type: 'pie',
            height: 250,
            backgroundColor: 'transparent'
        },
        title: {
            text: ''
        },
        tooltip: {
            valueSuffix: '%'
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20
                }, {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '1.2em',
                        textOutline: 'none',
                        opacity: 0.7
                    },
                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 10
                    }
                }]
            }
        },
        series: [
            {
                name: 'Percentage',
                colorByPoint: true,
                data: chartData
            }
        ]
    };

    return (
        <div className="p-4 h-full">
            <div className="mt-3">Tickets Analysis</div>
            <div className="chart-container">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                )}
            </div>
        </div>
    );
};

export default Piechart;
