import Popover from '../Popover';
import NotificationItem from './NotificationItem';

export default function Notification() {
  return (
    <Popover
      placement="bottom-center"
      renderPopover={
        <div
          id="toast-notification"
          className="min-w-[400px] py-4 text-gray-900 bg-white rounded-lg shadow-xl space-y-2"
          role="alert"
        >
          <div className="px-4 flex items-center mb-3">
            <span className="mb-1 text-sm font-semibold text-gray-900">
              New notification
            </span>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
              data-dismiss-target="#toast-notification"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div className="mx-2 max-h-[360px] overflow-auto cursor-pointer">
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
          </div>
        </div>
      }
      as="button"
      className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none"
    >
      <>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
        >
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>
      </>
      <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5"></div>
    </Popover>
  );
}
