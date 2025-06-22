export default function NotificationItem() {
  return (
    <div className="px-2 py-1 flex items-center hover:bg-gray-200 rounded-md">
      <div className="inline-block shrink-0">
        <img
          className="w-12 h-12 rounded-full"
          src="https://i.pinimg.com/736x/5c/18/4f/5c184f0bdf4b10542652931b7fd03a80.jpg"
          alt="Jese Leos image"
        />
      </div>
      <div className="ms-3 text-sm font-normal">
        <div className="text-sm font-semibold text-gray-900">Bonnie Green</div>
        <div className="text-sm font-normal">commented on your photo</div>
        <span className="text-xs font-medium text-blue-600">
          a few seconds ago
        </span>
      </div>
    </div>
  );
}
