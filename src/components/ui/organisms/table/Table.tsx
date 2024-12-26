import React from 'react';

type Row = {
  id: number;
  title: string;
  author: string;
  date: string;
};

type Column = {
  key: keyof Row;
  label: string;
};

type BoardTableProps = {
  columns: Column[];
  rows: Row[];
  sortKey: keyof Row;
  sortOrder: 'asc' | 'desc';
  onSortChange: (key: keyof Row, sortOrder: 'asc' | 'desc') => void;
  onRowClick: (id: number) => void;
};

export default function BoardTable({
  columns,
  rows,
  sortKey,
  sortOrder,
  onSortChange,
  onRowClick,
}: BoardTableProps) {
  const handleSort = (key: keyof Row) => {
    const newSortOrder =
      sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(key, newSortOrder);
  };

  return (
    <table className="min-w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="px-4 py-2 text-left cursor-pointer bg-gray-100 border border-gray-300"
              onClick={() => handleSort(column.key)}
            >
              {column.label}
              {sortKey === column.key && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.id}
            onClick={() => onRowClick(row.id)}
            className="hover:bg-gray-100 cursor-pointer"
          >
            {columns.map((column) => (
              <td key={column.key} className="px-4 py-2 border border-gray-300">
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
