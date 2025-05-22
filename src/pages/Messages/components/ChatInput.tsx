import { IoMdSend } from 'react-icons/io';
import { IoImagesOutline } from 'react-icons/io5';

export default function ChatInput({ disabled }: { disabled?: boolean }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="px-4 mt-auto">
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your message
      </label>
      <div className="flex items-center gap-3">
        <input type="file" id="file" hidden />
        <label htmlFor="file" className="cursor-pointer">
          <IoImagesOutline size={24} />
        </label>
        <input
          id="message"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
          placeholder="Write your thoughts here..."
          defaultValue=""
        />
        <button type="submit" disabled={disabled}>
          <IoMdSend size={24} className="fill-primary" />
        </button>
      </div>
    </form>
  );
}
