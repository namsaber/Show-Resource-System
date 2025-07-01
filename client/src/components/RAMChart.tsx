import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


// Định nghĩa Interface cho Props của RamChart
interface RamChartProps {
    ramInfo: RAM | null; // ramInfo có thể là null khi đang tải dữ liệu
}

const RamChart: React.FC<RamChartProps> = ({ ramInfo }) => {
    if (!ramInfo) {
        return <div>Đang tải dữ liệu RAM...</div>;
    }

    const data = {
        labels: ['RAM đã dùng', 'RAM khả dụng'],
        datasets: [
            {
                data: [ramInfo.used, ramInfo.free],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Sử dụng RAM: ${ramInfo.used.toFixed(2)}GB`,
                font: {
                    size: 18
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) { 
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed + ' GB';
                        }
                        return label;
                    }
                }
            }
        }
    };

    return (
        <div className="w-96 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Sử dụng RAM</h3>
            <p className="text-gray-600">Tổng: <span className="font-medium">{ramInfo.total} GB</span></p>
            <p className="text-gray-600">Đã dùng: <span className="font-medium">{ramInfo.used} GB</span></p>
            <p className="text-gray-600 mb-4">Khả dụng: <span className="font-medium">{ramInfo.free} GB</span></p>
            <Pie data={data} options={options} />
        </div>
    );
};

export default RamChart;