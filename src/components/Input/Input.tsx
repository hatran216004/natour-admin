import { InputHTMLAttributes } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

type PropsType = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  rules?: RegisterOptions;
  errorMessage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
};

export default function Input({
  label,
  type,
  placeholder,
  name,
  rules,
  errorMessage,
  defaultValue,
  register
}: PropsType) {
  const registerResult = register && name ? register(name, rules) : null;

  return (
    <div>
      <label className="text-sm text-[#2D3748] font-normal capitalize mb-[6px] block">
        {label}
      </label>
      <div className="min-w-[350px] rounded-2xl bg-transparent border border-[#E2E8F0] h-[50px] overflow-hidden px-5">
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
