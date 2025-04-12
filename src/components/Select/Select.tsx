import classNames from 'classnames';
import { SelectOptsType } from '../../types/utils.type';
import { UseFormRegister } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

type SelectPropsType = InputHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  options?: SelectOptsType[];
  errorMessage?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
};

export default function Select({
  className = '',
  options,
  name,
  errorMessage,
  register,
  ...rest
}: SelectPropsType) {
  const registreResult = register && name ? register(name) : null;
  return (
    <>
      <select
        {...rest}
        {...registreResult}
        className={classNames(
          'bg-white border border-gray-300 capitalize text-main text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1.5 focus:outline-none',
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
      {errorMessage && (
        <span className="text-xs text-red-500 mt-2">{errorMessage}</span>
      )}
    </>
  );
}
