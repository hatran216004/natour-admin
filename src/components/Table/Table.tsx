import classNames from 'classnames';

type BodyProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (data: any) => React.ReactNode;
};

type Props = {
  data?: string[];
  className?: string;
  children?: React.ReactNode;
};

export default function Table({ children }: Props) {
  return <table className="mt-3 w-full text-sm">{children}</table>;
}

function Header({ data, className }: Props) {
  return (
    <thead className={classNames('bg-gray-50', className)}>
      <tr>
        {data &&
          data?.map((ele) => (
            <th
              key={ele}
              scope="col"
              className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider text-nowrap"
            >
              {ele}
            </th>
          ))}
      </tr>
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
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(render)}
    </tbody>
  );
}

Table.Header = Header;
Table.Body = Body;
