import useUrl from '../../hooks/useUrl';
import { useSearchParams } from 'react-router-dom';
import { SelectOptsType } from '../../types/utils.type';

export type FilterSelectProps = {
  label: string;
  field: string;
  operator?: 'gte' | 'lte';
  options: SelectOptsType[];
};

export default function FilterSelect({
  label,
  field,
  operator,
  options
}: FilterSelectProps) {
  const fieldOperator = operator ? `${field}_${operator}` : field;
  const { currentValue, handler } = useUrl<string | undefined>({
    field: fieldOperator,
    defaultValue: ''
  });
  const [searchParams, setSearchParams] = useSearchParams();

  function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value === 'all') {
      searchParams.delete(fieldOperator);
      setSearchParams(searchParams);
      return;
    }
    handler(e.target.value);
  }

  return (
    <form className="max-w-sm flex items-center gap-3">
      <label className="text-main capitalize font-semibold text-nowrap">
        {label}
      </label>
      <select
        value={currentValue}
        onChange={handleOnChange}
        className="bg-gray-50 border border-gray-300 text-main text-sm rounded-lg block w-full px-2.5 py-1.5 focus:outline-none"
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
