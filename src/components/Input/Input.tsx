import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

type InputSize = 'lg' | 'md';

type PropsType = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name?: string;
  rules?: RegisterOptions;
  errorMessage?: string;
  inputSize?: InputSize;
  className?: string;
  roundedFull?: boolean;
  onClick?: () => void;
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
  inputSize = 'lg',
  errorMessage,
  roundedFull = true,
  defaultValue,
  register,
  onClick,
  onBlur = () => {},
  ...rest
}: PropsType) {
  const registerResult =
    register && name ? register(name, { onBlur, ...rules }) : null;

  return (
    <div onClick={() => onClick?.()}>
      <label
        htmlFor={name}
        className="text-sm text-[#2D3748] font-normal capitalize mb-[6px] block"
      >
        {label}
      </label>
      <div
        className={classNames(
          'bg-transparent border border-[#E2E8F0] overflow-hidden px-5',
          className,
          {
            'h-[50px] min-w-[350px]': inputSize === 'lg',
            'h-[40px] min-w-64 text-sm px-2': inputSize === 'md',
            'rounded-2xl': roundedFull
          }
        )}
      >
        <input
          {...rest}
          id={name}
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
