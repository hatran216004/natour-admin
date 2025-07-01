import useRoles from '../Users/hooks/useRoles';
import RoleCard from './components/RoleCard';

export default function Roles() {
  const { isLoading, roles } = useRoles();

  if (isLoading) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {roles && roles.map((role) => <RoleCard key={role._id} role={role} />)}
    </div>
  );
}
