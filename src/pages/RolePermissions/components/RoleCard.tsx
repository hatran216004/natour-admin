import { Edit, Shield, Trash2 } from 'lucide-react';
import { Role } from '../../../types/role.type';
import Modal from '../../../components/Modal';
import DeleteRoleContent from './DeleteRoleContent';
import UpdateRoleContent from './UpdateRoleContent';
import useGetAllPermissions from '../hooks/useGetAllPermissions';

const roleColor = {
  'lead-guide': 'bg-green-500',
  admin: 'bg-red-500',
  user: 'bg-blue-500',
  guide: 'bg-orange-500'
};

export default function RoleCard({ role }: { role: Role }) {
  const { permissions } = useGetAllPermissions();

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      key={role._id}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 ${
                roleColor[role.name] ? roleColor[role.name] : 'bg-gray-500'
              } rounded-lg flex items-center justify-center`}
            >
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {role.name.split('-').join(' ')}
              </h3>
              <p className="text-sm text-gray-500">{role.description}</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <Modal>
              <Modal.Open name="update-role">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </Modal.Open>
              <Modal.Open name="delete-role">
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </Modal.Open>

              <Modal.Content openName="delete-role">
                <DeleteRoleContent roleId={role._id} name={role.description} />
              </Modal.Content>

              <Modal.Content openName="update-role">
                <UpdateRoleContent
                  permissions={permissions || []}
                  role={role}
                />
              </Modal.Content>
            </Modal>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-600 mb-2 block">
              Permissions
            </span>
            <div className="flex flex-wrap gap-1">
              {role.permissions.slice(0, 3).map((permission) => (
                <span
                  key={permission._id}
                  className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {
                    role.permissions.find((p) => p._id === permission._id)
                      ?.description
                  }
                </span>
              ))}
              {!role.permissions.length && (
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  No permission
                </span>
              )}
              {role.permissions.length > 3 && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  +{role.permissions.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
