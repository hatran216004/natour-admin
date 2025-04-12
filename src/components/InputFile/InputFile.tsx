import { UseFormRegister } from 'react-hook-form';

type PropsType = {
  name: string;
  label?: string;
  multiple?: boolean;
  errorMessage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
};

export default function InputFile({
  multiple,
  label,
  errorMessage,
  name,
  register
}: PropsType) {
  const registerResult = name && register ? register(name) : null;
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm capitalize font-medium text-gray-900 text-nowrap">
        {label}
      </label>
      <input
        multiple={multiple}
        {...registerResult}
        className="block w-full text-xs text-gray-900 border border-gray-300 cursor-pointer bg-gray-50"
        type="file"
      />
      {errorMessage && (
        <span className="text-xs text-red-500 text-nowrap">{errorMessage}</span>
      )}
    </div>
  );
}
