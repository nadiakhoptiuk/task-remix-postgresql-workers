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

import { BarAvgDataType } from '~/types/common.types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
);

export const BarChartByDays = ({ data }: { data: BarAvgDataType[] }) => {
  const isEmptyAllData =
    data
      .map(({ date: _date, ...rest }) => {
        return { ...rest };
      })
      .map(object => {
        return Object.values(object).filter(el => el !== null);
      })
      .filter(arr => arr.length > 0).length === 0;

  if (isEmptyAllData) {
    return (
      <div className="mx-auto max-w-[1100px] w-full  max-h-[600px] flex flex-col justify-between items-center py-6 px-6 border-[1px] border-ui_grey rounded-md">
        <h2 className="mb-4 text-lg">Data by groups for each day of week:</h2>

        <p className="text-center my-8 text-ui_dark_grey">
          No data to display. Please choose another week...
        </p>
      </div>
    );
  }

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
    <div className="mx-auto max-w-[1100px] w-full  max-h-[600px] flex flex-col justify-between items-center py-6 px-6 border-[1px] border-ui_grey rounded-md">
      <h2 className="mb-4 text-lg">Data by groups for each day of week:</h2>

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
