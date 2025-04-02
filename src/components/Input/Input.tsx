import classNames from 'classNames';
import { InputHTMLAttributes } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

type PropsType = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  rules?: RegisterOptions;
  errorMessage?: string;
  variant?: 'lg' | 'md';
  className?: string;
  roundedFull?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
};

export default function Input({
  label,
  type,
  placeholder,
  name,
  rules,
  className = '',
  variant = 'lg',
  errorMessage,
  roundedFull = true,
  defaultValue,
  register
}: PropsType) {
  const registerResult = register && name ? register(name, rules) : null;

  return (
    <div>
      <label className="text-sm text-[#2D3748] font-normal capitalize mb-[6px] block">
        {label}
      </label>
      <div
        className={classNames(
          'min-w-[350px] bg-transparent border border-[#E2E8F0] overflow-hidden px-5',
          className,
          {
            'h-[50px]': variant === 'lg',
            'h-[40px] text-sm': variant === 'md',
            'rounded-2xl': roundedFull
          }
        )}
      >
        <input
          type={type}
          className="h-full w-full focus:outline-none"
          placeholder={placeholder}
          {...registerResult}
          defaultValue={defaultValue}
        />
      </div>
      {errorMessage && (
        <span className="text-xs text-red-500 mt-2">{errorMessage}</span>
      )}
    </div>
  );
}
