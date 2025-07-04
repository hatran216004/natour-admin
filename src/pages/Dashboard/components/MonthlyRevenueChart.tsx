import { useQuery } from '@tanstack/react-query';
import { bookingApi } from '../../../services/booking.api';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList
} from 'recharts';

// Custom Tooltip Component
const CustomTooltip = ({
  active,
  payload,
  label
}: {
  active?: boolean;
  payload?: {
    value: Date;
    payload: {
      totalBooking: number;
    };
  }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200 backdrop-blur-sm">
        <p className="text-gray-800 font-semibold mb-2">{`Tháng ${label}`}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500"></div>
            <span className="text-sm text-gray-600">Revenue:</span>
            <span className="font-bold text-blue-600">
              {payload[0].value.toLocaleString()} đ
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500"></div>
            <span className="text-sm text-gray-600">Booking count:</span>
            <span className="font-bold text-green-600">
              {payload[0].payload.totalBooking} lượt
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLabel = (props: {
  x?: number;
  y?: number;
  width?: number;
  value?: string;
}) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x! + width! / 2}
      y={y! - 8}
      fill="#6366f1"
      textAnchor="middle"
      fontSize="12"
      fontWeight="600"
      className="drop-shadow-sm"
    >
      {value}
    </text>
  );
};

export default function MonthlyRevenueChart() {
  const { data, isLoading } = useQuery({
    queryKey: ['monthly-revenue'],
    queryFn: bookingApi.getMonthlyRevenue
  });

  if (isLoading) return null;

  const monthlyRevenueData = data?.data.data.data;

  const dataChart = Array(12)
    .fill(0)
    .map((_, index) => {
      const findBooking = monthlyRevenueData?.find(
        (m) => m.month === index + 1
      );
      return {
        month: index + 1,
        totalBooking: findBooking ? findBooking.totalBooking : 0,
        totalRevenue: findBooking ? findBooking.totalRevenue : 0
      };
    });

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r text-primary">
          Revenue Chart
        </h2>
        <p className="text-gray-600 mt-1">
          Track revenue and bookings by month
        </p>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-inner">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={dataChart}
            margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
            barCategoryGap="20%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#4fd1c5"
              strokeOpacity={0.5}
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#4fd1c5', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#4fd1c5', fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />

            <Legend
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px',
                fontWeight: '500'
              }}
              iconType="circle"
            />

            <Bar
              dataKey="totalRevenue"
              name="Revenue (đ)"
              radius={[6, 6, 0, 0]}
              fill="url(#colorGradient)"
            >
              <LabelList
                dataKey="totalBooking"
                position="top"
                content={<CustomLabel />}
              />
            </Bar>

            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4fd1c5" stopOpacity={1} />
                <stop offset="50%" stopColor="#4fd1c5" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#4fd1c5" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {dataChart
              .reduce((sum, item) => sum + item.totalRevenue, 0)
              .toLocaleString()}
            đ
          </div>
          <div className="text-sm text-gray-600">Total revenue</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {dataChart.reduce((sum, item) => sum + item.totalBooking, 0)}
          </div>
          <div className="text-sm text-gray-600">Total booking</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {Math.round(
              dataChart.reduce((sum, item) => sum + item.totalRevenue, 0) /
                dataChart.reduce((sum, item) => sum + item.totalBooking, 0)
            ).toLocaleString()}
            đ
          </div>
          <div className="text-sm text-gray-600">Revenue/booking</div>
        </div>
      </div>
    </>
  );
}
