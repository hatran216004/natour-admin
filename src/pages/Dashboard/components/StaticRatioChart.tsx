import { useQuery } from '@tanstack/react-query';
import { bookingApi } from '../../../services/booking.api';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { type BookingStatus } from '../../../types/booking.type';

const STATUS_CONFIG = {
  Paid: {
    color: '#4fd1c5',
    gradient: 'from-emerald-400 to-green-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700'
  },
  Unpaid: {
    color: '#f59e0b',
    gradient: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700'
  },
  Cancelled: {
    color: '#ef4444',
    gradient: 'from-red-400 to-rose-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700'
  },
  Refunded: {
    color: '#8b5cf6',
    gradient: 'from-purple-400 to-violet-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700'
  },
  Failed: {
    color: '#64748b',
    gradient: 'from-slate-400 to-gray-600',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-700'
  }
};

const paymentStatus = ['Paid', 'Unpaid', 'Cancelled', 'Refunded', 'Failed'];

const CustomLegend = ({
  payload
}: {
  payload: { status: string; count: number }[];
}) => {
  const total = payload.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 mt-6">
      {payload.map((entry, index) => {
        const config = STATUS_CONFIG[entry.status as BookingStatus];
        const percentage = ((entry.count / total) * 100).toFixed(1);

        return (
          <div
            key={`legend-${index}`}
            className={`${config.bgColor} rounded-lg p-3 border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div>
                  <div className={`font-semibold ${config.textColor}`}>
                    {entry.status}
                  </div>
                  <div className="text-sm text-gray-600">
                    {entry.count} booking
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold text-lg ${config.textColor}`}>
                  {percentage}%
                </div>
                <div
                  className="w-3 h-3 rounded-full ml-auto"
                  style={{ backgroundColor: config.color }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function StaticRatioChart() {
  const { data, isLoading } = useQuery({
    queryKey: ['status-ratio'],
    queryFn: bookingApi.getStatusRatio
  });

  if (isLoading) return null;

  const statusRatioData = data?.data.data.data;
  let dataChart: { status: string; count: number }[] = [];
  if (statusRatioData) {
    dataChart = paymentStatus.map((ele) => {
      const findEle = statusRatioData!.find((s) => s.status === ele);
      return {
        status: ele,
        count: findEle ? findEle.count : 0
      };
    });
  }
  const total = dataChart.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Pie Chart */}
        <div className="relative">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-inner">
            <ResponsiveContainer width={320} height={320}>
              <PieChart>
                <Pie
                  data={dataChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="count"
                  paddingAngle={2}
                  animationBegin={0}
                  animationDuration={800}
                >
                  {dataChart.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={STATUS_CONFIG[entry.status as BookingStatus].color}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg">
              <div className="text-2xl font-bold text-gray-800">{total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-sm">
          <CustomLegend payload={dataChart} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-lg font-bold text-emerald-600">
            {(
              ((dataChart.find((s) => s.status === 'Paid')?.count || 0) /
                total) *
              100
            ).toFixed(1)}
            %
          </div>
          <div className="text-xs text-gray-600">Success</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-lg font-bold text-amber-600">
            {(
              ((dataChart.find((s) => s.status === 'Unpaid')?.count || 0) /
                total) *
              100
            ).toFixed(1)}
            %
          </div>
          <div className="text-xs text-gray-600">Unpaid</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-lg font-bold text-red-600">
            {(
              ((dataChart.find((s) => s.status === 'Cancelled')?.count || 0) /
                total) *
              100
            ).toFixed(1)}
            %
          </div>
          <div className="text-xs text-gray-600">Cancelled</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-lg font-bold text-purple-600">
            {(
              (((dataChart.find((s) => s.status === 'Refunded')?.count || 0) +
                (dataChart.find((s) => s.status === 'Failed')?.count || 0)) /
                total) *
              100
            ).toFixed(1)}
            %
          </div>
          <div className="text-xs text-gray-600">Refund/Error</div>
        </div>
      </div>
    </div>
  );
}
