import classNames from 'classnames';
import { InputHTMLAttributes, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

export default function Search({
  disabled,
  placeholder = 'Search here...',
  className: cssClasses = '',
  ...rest
}: { disabled?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form
      className={classNames(
        'flex items-center px-[10px] py-[13px] rounded-2xl border-2 border-[#E2E8F0]',
        cssClasses
      )}
      onSubmit={handleSubmit}
    >
      <IoIosSearch className="cursor-pointer mr-3" color="#2D3748" size={22} />
      <input
        {...rest}
        onChange={({ target }) => setValue(target.value)}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        type="text"
        className="w-full bg-transparent text-sm placeholder:text-[#A0AEC0] focus:outline-none"
      />
    </form>
  );
}
