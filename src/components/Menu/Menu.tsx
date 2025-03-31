export default function Menu({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden z-10 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs">
      {children}
    </div>
  );
}
