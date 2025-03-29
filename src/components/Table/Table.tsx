import { JSX } from 'react';

type PropsType = {
  render?: (JSX.Element | null)[];
};

export default function Table({ render = [] }: PropsType) {
  return (
    <table className="mt-3 w-full text-sm rtl:text-righ">
      <thead className="text-xs text-[#A0AEC0] uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-center">
            user
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            status
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            role
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            actions
          </th>
        </tr>
      </thead>
      <tbody>{render}</tbody>
    </table>
  );
}
