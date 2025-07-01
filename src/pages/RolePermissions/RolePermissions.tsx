import { useEffect, useRef } from 'react';
import { CircleUserRound, LayoutGrid, Plus, Shield } from 'lucide-react';
import Modal from '../../components/Modal';
import useUrl from '../../hooks/useUrl';
import useGetAllPermissions from './hooks/useGetAllPermissions';
import CreatePermissionContent from './components/CreatePermissionContent';
import CreateRoleContent from './components/CreateRoleContent';
import Roles from './Roles';
import Permissions from './Permissions';

const tabs = [
  { key: 'roles', label: 'Roles', icon: <LayoutGrid size={16} /> },
  {
    key: 'permissions',
    label: 'Permissions',
    icon: <CircleUserRound size={16} />
  }
];

const RolePermissionManager = () => {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<Record<string, HTMLElement | null>>({});

  const { permissions, isLoading } = useGetAllPermissions();

  const { currentValue: tabUrl, handler } = useUrl({
    field: 'tab',
    defaultValue: 'roles'
  });

  const handleActiveLine = (tabLi: HTMLLIElement) => {
    if (!lineRef.current) return;

    lineRef.current.style.width = `${tabLi.offsetWidth}px`;
    lineRef.current.style.transform = `translateX(${tabLi.offsetLeft}px)`;
  };

  useEffect(() => {
    if (!tabsRef.current) return;

    const tabActive = tabsRef.current[tabUrl as string];
    handleActiveLine(tabActive as HTMLLIElement);
  }, [tabUrl]);

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Role Permission Manager
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl sm:px-6 lg:px-4 pt-4">
        <div className="flex justify-end space-x-4 rounded-lg mb-6">
          <div className="border-b-2 border-gray-200 mr-auto relative">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 space-x-2">
              {tabs.map((tab) => (
                <li
                  key={tab.key}
                  ref={(ele) => {
                    tabsRef.current[tab.key] = ele;
                  }}
                  onClick={() => handler(tab.key)}
                  className={`inline-flex gap-2 items-center justify-center p-4 cursor-pointer select-none ${
                    tab.key === tabUrl ? 'text-blue-600' : ''
                  } rounded-t-lg`}
                >
                  {tab.icon}
                  {tab.label}
                </li>
              ))}
            </ul>
            <div
              ref={lineRef}
              className="absolute h-[2px] b-0 w-3 bg-blue-300 transition-[width,transform] duration-300"
            ></div>
          </div>
          <Modal closeMethods={['button', 'escape']}>
            {tabUrl === 'roles' && (
              <Modal.Open name="create-role">
                <button className="bg-blue-200 min-w-[132px] center hover:bg-blue-300 text-blue-800 p-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Plus size={16} />
                  <span>Role</span>
                </button>
              </Modal.Open>
            )}
            {tabUrl === 'permissions' && (
              <Modal.Open name="create-permission">
                <button className="bg-green-200 min-w-[132px] center hover:bg-green-300 text-green-800 p-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Plus size={16} />
                  <span>Permission</span>
                </button>
              </Modal.Open>
            )}

            <Modal.Content openName="create-role">
              <CreateRoleContent
                permissions={permissions || []}
                isLoading={isLoading}
              />
            </Modal.Content>

            <Modal.Content openName="create-permission">
              <CreatePermissionContent />
            </Modal.Content>
          </Modal>
        </div>
        {tabUrl === 'roles' && <Roles />}
        {tabUrl === 'permissions' && <Permissions />}
      </div>
    </div>
  );
};

export default RolePermissionManager;
