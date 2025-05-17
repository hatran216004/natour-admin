import { User } from '../../types/user.type';
import { useAuthStore } from '../../store/auth.store';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';
import Main from '../../components/Main';
import Table from '../../components/Table';
import Heading from '../../components/Heading';
import CreateUserContent from './components/CreateUserContent';
import UserOperator from './components/UserOperator';
import UserRow from './components/UserRow';
import useUsers from '../../features/user/useUsers';
import useRoles from '../../features/role/useRoles';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { FaPlusCircle } from 'react-icons/fa';

export default function Users() {
  const { user: userLoggined } = useAuthStore();
  const { users, totalPages, isLoading } = useUsers();
  const { rolesOpts } = useRoles();

  return (
    <Main>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Heading heading="manage users" />
          <Modal>
            <Modal.Open name="create-user">
              <Button
                size="md"
                icon={<FaPlusCircle size={18} />}
                className="gap-3 bg-primary"
              >
                create new user
              </Button>
            </Modal.Open>
            <Modal.Content openName="create-user">
              <CreateUserContent rolesOpts={rolesOpts} />
            </Modal.Content>
          </Modal>
        </div>
        <UserOperator rolesOpts={rolesOpts} />
      </div>
      {isLoading && (
        <div className="h-full center">
          <Spinner size="lg" />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="overflow-y-auto">
            <Table>
              <Table.Header>
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    user
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    status
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    role
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    actions
                  </th>
                </tr>
              </Table.Header>
              <Table.Body
                data={users}
                render={(user: User) => {
                  if (user._id === userLoggined?._id) return null;
                  return (
                    <UserRow user={user} key={user._id} rolesOpts={rolesOpts} />
                  );
                }}
              />
            </Table>
          </div>
          <Pagination
            className="ml-auto mt-auto mb-[-12px]"
            totalPages={totalPages}
          />
        </>
      )}
    </Main>
  );
}
