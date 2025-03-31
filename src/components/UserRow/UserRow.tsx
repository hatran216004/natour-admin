import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { User } from '../../types/user.type';

export default function UserRow({ user }: { user: User }) {
  return (
    <tr className="bg-white border-b border-gray-200" key={user.id}>
      <td scope="row" className="px-6 py-4 flex gap-[14px] items-center">
        <img
          className="w-10 h-10 object-cover rounded-xl"
          src={`${import.meta.env.VITE_API_BASE_URL}/img/users/${user.photo}`}
          alt={user.name}
        />
        <div>
          <h2 className="text-main text-sm font-bold capitalize">
            {user.name}
          </h2>
          <h2 className="text-[#718096] text-sm">{user.email}</h2>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <button
          className={`px-4 py-1 text-center ${
            user.active ? 'bg-[#48BB78]' : 'bg-[#CBD5E0]'
          } rounded-xl capitalize text-white font-bold`}
        >
          {user.active ? 'active' : 'inactive'}
        </button>
      </td>
      <td className="px-6 py-4 text-center capitalize text-main font-bold">
        {user.role?.name}
      </td>
      <td className="px-6 py-4">
        <div className="center p-3 cursor-pointer">
          <PiDotsThreeVerticalBold />
        </div>
      </td>
    </tr>
  );
}
