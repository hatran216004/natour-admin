import useUrl from '../../hooks/useUrl';
import { useSearchParams } from 'react-router-dom';
import { FilterOptsType } from '../../types/utils.type';

export type FilterSelectProps = {
  label: string;
  field: string;
  options: FilterOptsType[];
};

export default function FilterSelect({
  label,
  field,
  options
}: FilterSelectProps) {
  const { currentValue, handler } = useUrl<string | undefined>({
    field,
    defaultValue: ''
  });
  const [searchParams, setSearchParams] = useSearchParams();

  function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value === 'all') {
      searchParams.delete(field);
      setSearchParams(searchParams);
      return;
    }
    handler(e.target.value);
  }

  return (
    <form className="max-w-sm flex items-center gap-3">
      <label className="text-main capitalize font-semibold">{label}</label>
      <select
        value={currentValue}
        onChange={handleOnChange}
        id="users"
        className="bg-gray-50 border border-gray-300 text-main text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 focus:outline-none"
      >
        <option key="all" className="capitalize" value="all">
          all
        </option>
        {options?.map((option) => {
          const optionLabel = option.label.replace(/-/g, ' ');
          return (
            <option
              key={option.value}
              className="capitalize"
              value={option.value}
            >
              {optionLabel}
            </option>
          );
        })}
      </select>
    </form>
  );
}
