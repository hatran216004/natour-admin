import MonthlyRevenueChart from './components/MonthlyRevenueChart';
import StaticRatioChart from './components/StaticRatioChart';
import TopBooked from './components/TopBooked';

export default function Dashboard() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl shadow-lg h-full overflow-auto">
      <MonthlyRevenueChart />
      <div className="flex mt-8 gap-4">
        <StaticRatioChart />
        <TopBooked />
      </div>
    </div>
  );
}
