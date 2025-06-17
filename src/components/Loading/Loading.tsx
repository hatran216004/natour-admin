export default function Loading() {
  return (
    <div className="absolute flex items-center justify-center inset-0 bg-transparent">
      <div className="p-3 text-sm font-medium leading-none text-center text-white bg-primary rounded-full animate-pulse">
        loading...
      </div>
    </div>
  );
}
