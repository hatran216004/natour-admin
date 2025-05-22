// import UserListItem from '../../components/UserListItem';

import { IoMdSend } from 'react-icons/io';
import Main from '../../components/Main';

const users = [
  {
    email: 'anv@gmail.com',
    name: 'Nguyen Van A',
    photo:
      'https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    email: 'bnv@gmail.com',
    name: 'Nguyen Van B',
    photo:
      'https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=1916&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    email: 'cnv@gmail.com',
    name: 'Nguyen Van C',
    photo:
      'https://plus.unsplash.com/premium_photo-1668485966810-cbd0f685f58f?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    email: 'dnv@gmail.com',
    name: 'Nguyen Van D',
    photo:
      'https://plus.unsplash.com/premium_photo-1668319914124-57301e0a1850?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    email: 'env@gmail.com',
    name: 'Nguyen Van D',
    photo:
      'https://plus.unsplash.com/premium_photo-1671586881745-7b3d98a73138?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    email: 'env@gmail.com',
    name: 'Nguyen Van D',
    photo:
      'https://plus.unsplash.com/premium_photo-1671586881745-7b3d98a73138?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

export default function Messages() {
  return (
    <Main>
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <h4 className="font-semibold text-lg">Messages (10)</h4>
          <ul className="mt-7 space-y-3 overflow-auto max-h-[504px] pr-3">
            {users.map((user, index) => {
              const { email, name, photo } = user;
              return (
                <li
                  key={index}
                  className="flex items-start cursor-pointer hover:opacity-85 justify-between p-4 bg-slate-200 rounded-lg shadow-sm"
                >
                  <div className="flex gap-[14px] items-center">
                    <figure className="relative">
                      <img
                        className="w-10 h-10 object-cover rounded-xl"
                        src={photo}
                        alt={name}
                      />
                      <span className="w-2 h-2 rounded-full bg-green-500 absolute right-0 bottom-0"></span>
                    </figure>
                    <div>
                      <h2 className="text-main text-sm font-bold capitalize">
                        {name}
                      </h2>
                      <h2 className="text-[#718096] text-sm">{email}</h2>
                    </div>
                  </div>
                  <span className="text-xs">5 minutes ago</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-span-8">
          <div className="bg-[#f4f4fa] h-full rounded-lg py-4 shadow-lg flex flex-col">
            {/* header */}
            <div className="pb-3 px-4 border-b-2 border-gray-100">
              <div className="flex gap-[14px] items-center">
                <figure className="relative">
                  <img
                    className="w-10 h-10 object-cover rounded-xl"
                    src="https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="anv"
                  />
                  <span className="w-2 h-2 rounded-full bg-green-500 absolute right-0 bottom-0"></span>
                </figure>
                <div>
                  <h2 className="text-main text-sm font-bold capitalize">
                    Nguyen Van A
                  </h2>
                  <h2 className="text-[#718096] text-sm">anv@gmail.com</h2>
                </div>
              </div>
            </div>
            {/* main */}
            <div className="flex flex-col flex-1 px-4">
              {/* chat content */}
              <div className="py-4 h-full space-y-4">
                {/* chat item 1 */}
                <div className="flex gap-[14px] items-end">
                  <img
                    className="w-8 h-8 object-cover rounded-full flex-shrink-0"
                    src="https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="anv"
                  />
                  <p className="p-2 rounded-xl bg-white text-ellipsis">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsam, at.Lorem, ipsum dolor sit amet consectetur
                    adipisicing elit. Ipsam, at.Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Ipsam, at.Lorem, ipsum dolor
                    sit amet consectetur adipisicing elit. Ipsam, at.Lorem,
                    ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
                    at.Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsam, at.Lorem, ipsum dolor sit amet consectetur
                    adipisicing elit. Ipsam, at.Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Ipsam, at.
                  </p>
                </div>
                {/* chat item 2 */}
                <div className="flex gap-[14px] items-end">
                  <img
                    className="w-8 h-8 object-cover rounded-full flex-shrink-0"
                    src="https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="anv"
                  />
                  <p className="p-2 rounded-xl bg-white text-ellipsis">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsam, at.
                  </p>
                </div>

                {/* chat item 3 */}
                <div className="flex gap-[14px] items-end flex-row-reverse">
                  <img
                    className="w-8 h-8 object-cover rounded-full flex-shrink-0"
                    src="https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=1916&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="anv"
                  />
                  <p className="p-2 rounded-xl bg-blue-400 text-white">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsam, at.
                  </p>
                </div>
              </div>
              {/* chat editer */}
              <form onSubmit={(e) => e.preventDefault()}>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your message
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="message"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
                    placeholder="Write your thoughts here..."
                    defaultValue=""
                  />
                  <button>
                    <IoMdSend size={24} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}
