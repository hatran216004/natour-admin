import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import { type Permission } from '../../types/permission.type';
import PermissionRow from './components/PermissionRow';
import usePermission from './hooks/usePermission';

export default function Permissions() {
  const { isLoading, permissions, totalPages } = usePermission();

  if (isLoading) return null;
  return (
    <div className="pb-2 flex flex-col border border-gray-200 rounded-md shadow-sm flex-1">
      <div className="overflow-y-auto flex-1">
        <Table>
          <Table.Header data={['name', 'description', 'actions']} />
          <Table.Body
            data={permissions || []}
            render={(permission: Permission) => (
              <PermissionRow key={permission._id} permission={permission} />
            )}
          />
        </Table>
      </div>
      <Pagination className="m-2 mb-0 ml-auto" totalPages={totalPages} />
    </div>
  );
}
