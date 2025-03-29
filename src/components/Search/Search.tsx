import { IoIosSearch } from 'react-icons/io';

export default function Search() {
  return (
    <div className=" flex items-center px-[10px] py-[13px] rounded-2xl border-2 border-[#E2E8F0]">
      <IoIosSearch className="cursor-pointer mr-3" color="#2D3748" size={22} />
      <input
        placeholder="Type here..."
        type="text"
        className="w-full bg-transparent text-sm placeholder:text-[#A0AEC0] placeholder:capitalize focus:outline-none"
      />
    </div>
  );
}
