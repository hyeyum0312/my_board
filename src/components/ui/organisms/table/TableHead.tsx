// components/ui/organisms/TableHead.tsx
import React from 'react';

type TableHeadProps = {
  onSort: (key: 'title' | 'author' | 'date') => void;
};

const TableHead: React.FC<TableHeadProps> = ({ onSort }) => {
  return (
    <thead>
      <tr>
        <th
          className="px-4 py-2 border-b cursor-pointer"
          onClick={() => onSort('title')}
        >
          제목
        </th>
        <th
          className="px-4 py-2 border-b cursor-pointer"
          onClick={() => onSort('author')}
        >
          작성자
        </th>
        <th
          className="px-4 py-2 border-b cursor-pointer"
          onClick={() => onSort('date')}
        >
          작성일
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
