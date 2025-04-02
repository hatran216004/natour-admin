import classNames from 'classNames';
import { SelectOptsType } from '../../types/utils.type';
import { UseFormRegister } from 'react-hook-form';

export default function Select({
  className,
  options,
  name,
  register
}: {
  className?: string;
  options: SelectOptsType[];
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
}) {
  const registreResult = register && name ? register(name) : null;
  return (
    <select
      {...registreResult}
      className={classNames(
        'bg-gray-50 border border-gray-300 text-main text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 focus:outline-none',
        className
      )}
    >
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
  );
}
