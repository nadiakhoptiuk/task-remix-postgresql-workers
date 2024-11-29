import { format } from 'date-fns';
import {
  BarChart as BaseBarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Rectangle,
  CartesianGrid,
} from 'recharts';

import { barAvgDataType } from '~/types/common.types';

export const BarChart = ({ data }: { data: barAvgDataType[] }) => {
  const barTransformedData = data.map(({ billable, notBillable, date }) => {
    return {
      name: format(new Date(date), 'EEEE'),
      billable,
      notBillable,
    };
  });

  return (
    <div className="mx-auto max-w-[1200px] w-full  max-h-[600px] flex flex-col justify-center items-center py-6 px-6 border-[1px] border-ui_grey">
      <h2 className="mb-10">Total data by groups for the selected week:</h2>
      <BaseBarChart width={600} height={500} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="5 5" />
        <Legend />
        <Bar
          data={barTransformedData}
          dataKey="billable"
          barSize={30}
          fill="#3E69AD"
          // label={renderCustomBarLabel}
          activeBar={<Rectangle fill="#2C528F" stroke="#D9D9D9" />}
        />
        <Bar
          dataKey="notBillable"
          fill="#F80909"
          activeBar={<Rectangle fill="gold" stroke="#D9D9D9" />}
        />
      </BaseBarChart>
    </div>
  );
};
