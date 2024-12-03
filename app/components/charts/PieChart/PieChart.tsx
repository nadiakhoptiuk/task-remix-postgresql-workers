import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  ArcElement,
  Legend,
} from 'chart.js';

import { TotalDataChartType } from '~/types/common.types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  ArcElement,
);

export const PieChart = ({ data }: { data: TotalDataChartType }) => {
  const labels = ['Billable', 'Not Billable', 'Absent'];
  const colors = [
    'rgba(75, 192, 192, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
  ];

  const chartData = [
    {
      data: Object.values(data),
      backgroundColor: colors,
      hoverOffset: 4,
      borderWidth: 2,
    },
  ];

  return (
    <div className="mx-auto max-w-[700px] w-full max-h-[400px] flex flex-col justify-between items-center py-6 px-6 border-[1px] border-ui_grey">
      <h2 className="mb-4 text-lg">
        Total data by groups for the selected week:
      </h2>
      <Pie
        data={{
          labels: labels,
          datasets: chartData,
        }}
        options={{ radius: 100 }}
      />
    </div>
  );
};
