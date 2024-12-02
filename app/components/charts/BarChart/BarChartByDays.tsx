import { format } from 'date-fns';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  BarElement,
} from 'chart.js';

import { barAvgDataType } from '~/types/common.types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
);

export const BarChartByDays = ({ data }: { data: barAvgDataType[] }) => {
  const labels = data.map(({ date }) => format(new Date(date), 'EEEE'));
  // const colors = ['#32a852', '#F80909', '#e6e645'];

  const datasets = data.map(({ billable, notBillable, absent, date }) => {
    return {
      label: format(new Date(date), 'EEEE'),
      data: [billable, notBillable, absent],
      backgroundColor: '#32a852',
    };
  });

  return (
    <div className="mx-auto max-w-[1200px] w-full  max-h-[600px] flex flex-col justify-center items-center py-6 px-6 border-[1px] border-ui_grey">
      <h2 className="mb-10">Total data by groups for the selected week:</h2>
      <Bar
        data={{
          labels: labels,
          datasets: datasets,
        }}
        options={{}}
      />
    </div>
  );
};
