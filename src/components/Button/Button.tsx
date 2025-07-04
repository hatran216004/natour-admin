import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import Spinner from '../Spinner';

type ButtonSize = 'lg' | 'sm' | 'md';

type PropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  size?: ButtonSize;
  variant?: string | null;
  disabled?: boolean;
  isLoading?: boolean;
};

export default function Button(props: PropsType) {
  const {
    children,
    className = '',
    icon,
    variant = 'primary',
    size = 'lg',
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
        'relative center min-w-[108px] px-3 rounded-xl text-center text-white capitalize font-bold text-sm hover:opacity-90',
        className,
        {
          'h-[45px]': size === 'lg',
          'h-[28px] text-sm font-semibold': size === 'md',
          'h-[20px] text-xs font-normal': size === 'sm',
          'bg-primary': variant === 'primary'
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
