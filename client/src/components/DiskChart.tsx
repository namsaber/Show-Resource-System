import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Định nghĩa Interface cho Props của DiskChart
interface DiskChartProps {
    diskInfo: Disk; // diskInfo sẽ luôn có dữ liệu khi component này được render
}

const DiskChart: React.FC<DiskChartProps> = ({ diskInfo }) => {
    if (!diskInfo) {
        return <div>Đang tải dữ liệu Disk...</div>;
    }

    const data = {
        labels: ['Dung lượng đã dùng', 'Dung lượng khả dụng'],
        datasets: [
            {
                data: [diskInfo.used, diskInfo.free],
                backgroundColor: ['#FF9F40', '#6A8B88'],
                hoverBackgroundColor: ['#FF9F40', '#6A8B88'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Sử dụng ${diskInfo.name}: ${diskInfo.used.toFixed(2)}%`,
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
            <h3 className="text-xl font-semibold mb-2 text-gray-700">{diskInfo.name}</h3>
            <p className="text-gray-600">Tổng: <span className="font-medium">{diskInfo.total} GB</span></p>
            <p className="text-gray-600">Đã dùng: <span className="font-medium">{diskInfo.used} GB</span></p>
            <p className="text-gray-600 mb-4">Khả dụng: <span className="font-medium">{diskInfo.free} GB</span></p>
            <Pie data={data} options={options} />
        </div>
    );
};

export default DiskChart;