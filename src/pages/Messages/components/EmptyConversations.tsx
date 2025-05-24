export default function EmptyConversations() {
  return (
    <div
      className="absolute text-center text-gray-500 px-4 w-full
      -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    >
      <div className="mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-400 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 8h10M7 12h4m1 8a9 9 0 100-18 9 9 0 000 18zm4.5-4.5L21 21"
          />
        </svg>
      </div>
      <h2 className="text-lg font-semibold mb-1">No conversation found</h2>
    </div>
  );
}
