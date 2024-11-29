import { PieChart as BasePieChart, Pie, Cell, Legend } from 'recharts';

import { TotalDataChartType } from '~/types/common.types';

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: string;
  cy: string;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  midAngle: number;
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

export const PieChart = ({ data }: { data: TotalDataChartType }) => {
  const colors = ['#3E69AD', '#F80909', '#D9D9D9'];

  const dataArray = Object.entries(data).map(arr => ({
    name: arr[0],
    value: arr[1] ?? 0,
  }));

  return (
    <>
      {data && dataArray.length !== 0 ? (
        <div className="mx-auto w-[600px] h-[500px] flex flex-col justify-center items-center py-8 px-12 border-[1px] border-ui_grey">
          <h2 className="mb-10">Total data by groups for the selected week:</h2>

          <BasePieChart width={450} height={350}>
            <Legend />
            <Pie
              data={dataArray}
              nameKey="name"
              dataKey="value"
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#3E69AD"
            />
            {dataArray.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </BasePieChart>
        </div>
      ) : (
        <p>There is no data for chart</p>
      )}
    </>
  );
};
