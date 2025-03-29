import { InputHTMLAttributes } from 'react';

type PropsType = InputHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
};

export default function Button({
  children,
  className,
  icon,
  onClick
}: PropsType) {
  const style = className
    ? `${className} center bg-primary rounded-xl text-center h-[45px] text-white uppercase font-bold text-sm hover:opacity-90`
    : 'w-full center bg-primary rounded-xl text-center h-[45px] text-white uppercase font-bold text-sm hover:opacity-90';
  return (
    <button className={style} onClick={onClick}>
      {icon && icon}
      {children}
    </button>
  );
}
