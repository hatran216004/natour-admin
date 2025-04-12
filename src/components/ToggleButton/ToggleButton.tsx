import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';

export default function ToggleButton({
  label,
  checked,
  onChecked
}: {
  label: string;
  checked: boolean;
  onChecked: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <label className="inline-flex items-center mb-5 cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={() => onChecked(!checked)}
      />
      <div
        className={classNames(
          "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer  after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all",
          {
            'peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white peer-checked:bg-primary':
              checked
          }
        )}
      ></div>
      <span className="ms-3 text-sm font-medium text-gray-900 select-none">
        {label}
      </span>
    </label>
  );
}
