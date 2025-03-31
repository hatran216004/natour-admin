import { User } from '../../types/user.type';

type BodyProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  render: (user: User) => React.ReactNode;
};

type Props = { children: React.ReactNode };

export default function Table({ children }: Props) {
  return <table className="mt-3 w-full text-sm">{children}</table>;
}

function Header({ children }: Props) {
  return (
    <thead className="text-xs text-[#A0AEC0] uppercase bg-gray-50">
      {children}
    </thead>
  );
}

function Body({ data, render }: BodyProps) {
  if (!data.length)
    return (
      <tbody className="text-3xl text-gray-400">
        <tr>
          <td>
            <p className="uppercase font-semibold absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              Data not found
            </p>
          </td>
        </tr>
      </tbody>
    );
  return <tbody>{data.map(render)}</tbody>;
}

Table.Header = Header;
Table.Body = Body;
