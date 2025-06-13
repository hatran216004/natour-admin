export default function Skeleton() {
  return (
    <div className="space-y-6">
      <div>
        <div role="status" className="max-w-sm animate-pulse w-full">
          <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <div
          role="status"
          className="max-w-sm animate-pulse flex-1 flex flex-col items-end"
        >
          <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-full w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-full w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-full w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-full w-[360px]"></div>
        </div>
      </div>
    </div>
  );
}
