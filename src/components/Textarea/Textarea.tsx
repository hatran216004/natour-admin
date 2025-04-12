import { UseFormRegister } from 'react-hook-form';

type PropsType = {
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
  errorMessage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
};

export default function Textarea({
  className,
  name,
  placeholder,
  errorMessage,
  register
}: PropsType) {
  const registerResult = name && register ? register(name) : null;

  return (
    <div className={className}>
      <textarea
        id={name}
        {...registerResult}
        rows={4}
        className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none"
        placeholder={placeholder}
      ></textarea>
      {errorMessage && (
        <span className="text-xs text-red-500 mt-2">{errorMessage}</span>
      )}
    </div>
  );
}
