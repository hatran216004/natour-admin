import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';
import { IoIosSearch } from 'react-icons/io';
import useUrl from '../../hooks/useUrl';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../Spinner';

export default function Search({
  disabled,
  placeholder = 'Search here...',
  className: cssClasses = '',
  handleClearInput,
  isLoading = false,
  ...rest
}: {
  disabled?: boolean;
  isLoading?: boolean;
  handleClearInput?: () => void;
} & InputHTMLAttributes<HTMLInputElement>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentValue, handler } = useUrl({
    field: 'search',
    defaultValue: ''
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (!value.trim()) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('search');
      setSearchParams(newSearchParams);
      handleClearInput?.();
    } else {
      handler(value);
    }
  }

  return (
    <form
      className={classNames(
        'flex items-center px-[10px] py-[13px] rounded-2xl border-2 border-[#E2E8F0]',
        cssClasses
      )}
      onSubmit={(e) => e.preventDefault()}
    >
      {isLoading ? (
        <Spinner
          size="sm"
          className="mr-3 w-[22px] h-[22px] flex items-center justify-center"
        />
      ) : (
        <IoIosSearch
          className="cursor-pointer mr-3"
          color="#2D3748"
          size={22}
        />
      )}

      <input
        onChange={handleOnChange}
        value={currentValue}
        disabled={disabled}
        placeholder={placeholder}
        type="text"
        className="w-full bg-transparent text-sm placeholder:text-[#A0AEC0] focus:outline-none"
        {...rest}
      />
    </form>
  );
}
