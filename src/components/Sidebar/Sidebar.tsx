import { Link, useLocation } from 'react-router-dom';
import icons from '../../assets/icons';
import { links } from '../../utils/links';
import Button from '../Button';
import { FiLogOut } from 'react-icons/fi';

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="col-span-3 h-full bg-white rounded-xl shadow-custom">
      <div className="p-6 flex flex-col h-full">
        <div className="center gap-3">
          <img src={icons.logo_bold} alt="" />
          <h3 className="text-main font-bold text-sm uppercase">
            natours dashboard
          </h3>
        </div>
        <span className="h-[2px] w-full block mt-7 mb-[22px] bg-gray-200 rounded-sm"></span>
        <ul className="w-full">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            const Icon = link.icon;
            if (link.href === '/profile') {
              return (
                <div key={link.href}>
                  <h4 className="text-base text-main uppercase font-bold my-6">
                    ACCOUNT PAGES
                  </h4>
                  <li>
                    <Link
                      to={link.href}
                      className={`${
                        isActive ? 'bg-white shadow-custom' : 'bg-transparent'
                      } rounded-2xl py-3 px-4 flex items-center gap-3`}
                    >
                      <div
                        className={`${
                          isActive ? 'bg-primary' : 'bg-white'
                        } rounded-xl p-[7.5px]`}
                      >
                        <Icon
                          className={`${
                            isActive ? 'fill-white' : 'fill-primary'
                          } w-5 h-5`}
                        />
                      </div>
                      <span
                        className={`${
                          isActive ? 'text-main' : 'text-[#A0AEC0]'
                        } text-base font-bold capitalize`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                </div>
              );
            }

            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`${
                    isActive ? 'bg-white shadow-custom' : 'bg-transparent'
                  } rounded-2xl py-3 px-4 flex items-center gap-3`}
                >
                  <div
                    className={`${
                      isActive ? 'bg-primary' : 'bg-white'
                    } rounded-xl p-[7.5px]`}
                  >
                    <Icon
                      className={`${
                        isActive ? 'fill-white' : 'fill-primary'
                      } w-5 h-5`}
                    />
                  </div>
                  <span
                    className={`${
                      isActive ? 'text-main' : 'text-[#A0AEC0]'
                    } text-base font-bold capitalize`}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Button
          className="w-full mt-auto gap-5"
          icon={<FiLogOut className="w-5 h-5" />}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
