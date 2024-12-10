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
import { CHARTS_COLORS } from '~/constants/constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  ArcElement,
);

export const PieChart = ({ data }: { data: TotalDataChartType }) => {
  const isDataEmpty =
    Object.values(data).filter(el => el !== null).length === 0;

  if (isDataEmpty) {
    return (
      <div className="mx-auto xl:max-w-[700px] w-full max-h-[400px] flex flex-col justify-between items-center py-6 px-6 border-[1px] border-ui_grey rounded-md">
        <h2 className="mb-4 text-lg">
          Total data by groups for the selected week:
        </h2>
        <p className="text-center my-8 text-ui_dark_grey">
          No data to display. Please choose another week...
        </p>
      </div>
    );
  }

  const labels = ['Billable', 'Not Billable', 'Absent'];

  const chartData = [
    {
      data: Object.values(data),
      backgroundColor: CHARTS_COLORS,
      hoverOffset: 4,
      borderWidth: 2,
    },
  ];

  return (
    <div className="mx-auto xl:max-w-[700px] w-full max-h-[400px] flex flex-col justify-between items-center py-6 px-6 border-[1px] border-ui_grey rounded-md">
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
