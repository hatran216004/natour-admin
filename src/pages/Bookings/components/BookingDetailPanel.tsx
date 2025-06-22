export default function BookingDetailPanel({
  title,
  children
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <i className="fas fa-map-marked-alt text-blue-600 mr-3" />
          {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
