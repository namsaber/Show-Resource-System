import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Định nghĩa Interface cho Props của CpuChart
interface CpuChartProps {
    cpuInfo: CPU | null; // cpuInfo có thể là null khi đang tải dữ liệu
}

const CpuChart: React.FC<CpuChartProps> = ({ cpuInfo }) => {
    if (!cpuInfo) {
        return <div>Đang tải dữ liệu CPU...</div>;
    }

    const data = {
        labels: ['CPU đã dùng', 'CPU khả dụng'],
        datasets: [
            {
                data: [cpuInfo.usedPercent.toFixed(2), cpuInfo.availablePercent.toFixed(2)],
                backgroundColor: ['#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: ['#FFCE56', '#4BC0C0'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Sử dụng CPU: ${cpuInfo.usedPercent.toFixed(2)}%`,
                font: {
                    size: 18
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) { 
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed + '%';
                        }
                        return label;
                    }
                }
            }
        }
    };

    return (
        <div className="w-96 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Sử dụng CPU</h3>
            <p className="text-gray-600">Số nhân logic: <span className="font-medium">{cpuInfo.core}</span></p>
            <Pie data={data} options={options} />
        </div>
    );
};

export default CpuChart;