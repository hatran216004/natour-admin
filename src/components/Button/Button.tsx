import classNames from 'classNames';
import { ButtonHTMLAttributes } from 'react';
import Spinner from '../Spinner';

type ButtonSize = 'lg' | 'sm' | 'md';

type PropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  variant?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
};

export default function Button(props: PropsType) {
  const {
    children,
    className = '',
    icon,
    variant = 'lg',
    isLoading,
    disabled,
    onClick,
    ...rest
  } = props;

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof key === 'function') delete props[key];
    });
  }
  return (
    <button
      className={classNames(
        'center bg-primary px-3 rounded-xl text-center text-white uppercase font-bold text-sm hover:opacity-90',
        className,
        {
          'h-[45px]': variant === 'lg',
          'h-[28px] text-sm font-semibold': variant === 'md',
          'h-[20px] text-xs font-normal': variant === 'sm'
        }
      )}
      onClick={onClick}
      {...rest}
    >
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {icon && icon}
          {children}
        </>
      )}
    </button>
  );
}
