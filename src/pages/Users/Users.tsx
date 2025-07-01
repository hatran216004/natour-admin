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
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { FaPlusCircle } from 'react-icons/fa';
import useRoles from './hooks/useRoles';
import useUsers from './hooks/useUsers';

export default function Users() {
  const { user: userLoggined } = useAuthStore();
  const { users, totalPages, isLoading } = useUsers();
  const { rolesOpts } = useRoles();

  return (
    <Main>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Heading heading="manage users" />
          <Modal closeMethods={['button', 'escape']}>
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
          <div className="overflow-y-auto flex-1">
            <Table>
              <Table.Header data={['user', 'status', 'role', 'actions']} />
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
