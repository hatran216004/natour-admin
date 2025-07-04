import FilterSelect from '../../../components/FilterSelect';
import { SelectOptsType } from '../../../types/utils.type';

const userOptions: SelectOptsType[] = [
  {
    label: 'active',
    value: 'true'
  },
  {
    label: 'inactive',
    value: 'false'
  }
];

export default function UserOperator({
  rolesOpts
}: {
  rolesOpts: SelectOptsType[];
}) {
  return (
    <div className="flex items-center gap-8">
      <FilterSelect label="status" options={userOptions} field="active" />
      <FilterSelect label="role" options={rolesOpts} field="role" />
    </div>
  );
}
