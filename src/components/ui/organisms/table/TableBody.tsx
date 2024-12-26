// components/ui/organisms/TableBody.tsx
import React from 'react';

type TableBodyProps = {
  data: Array<{ id: number; title: string; author: string; date: string }>;
  onRowClick: (id: number) => void;
};

const TableBody: React.FC<TableBodyProps> = ({ data, onRowClick }) => {
  return (
    <tbody>
      {data.map((item) => (
        <tr
          key={item.id}
          className="hover:bg-gray-100 cursor-pointer"
          onClick={() => onRowClick(item.id)}
        >
          <td className="px-4 py-2 border-b">{item.title}</td>
          <td className="px-4 py-2 border-b">{item.author}</td>
          <td className="px-4 py-2 border-b">{item.date}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
