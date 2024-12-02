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
  const days = data.map(({ date }) => format(new Date(date), 'EEEE'));
  const labels = ['Billable', 'Not Billable', 'Absent'];
  const colors = [
    'rgba(75, 192, 192, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
  ];

  const billableData = data.map(({ billable }) => {
    return billable;
  });
  const notBillableData = data.map(({ notBillable }) => {
    return notBillable;
  });
  const absentData = data.map(({ absent }) => {
    return absent;
  });

  const arrayOfData = [billableData, notBillableData, absentData];

  const datasets = labels.map((label, index) => ({
    label: label,
    data: arrayOfData[index],
    backgroundColor: colors[index],
    hoverOffset: 4,
    borderWidth: 2,
  }));

  return (
    <div className="mx-auto max-w-[1200px] w-full  max-h-[600px] flex flex-col justify-between items-center py-6 px-6 border-[1px] border-ui_grey">
      <h2 className="mb-4 text-lg">
        Total data by groups for the selected week:
      </h2>

      <Bar
        data={{
          labels: days,
          datasets: datasets,
        }}
        options={{}}
      />
    </div>
  );
};
