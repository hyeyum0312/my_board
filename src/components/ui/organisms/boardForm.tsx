import React from 'react';
import Input from '@/components/ui/atom/Input';
import Button from '@/components/ui/atom/Button';
import { Board } from '@/lib/mocks/board/types';

interface BoardFormProps {
  formData: Partial<Board>;
  onChange: (field: keyof Board, value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const BoardForm = ({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
}: BoardFormProps) => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Board Details</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title:</label>
        <Input
          type="text"
          value={formData.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Author:</label>
        <Input
          type="text"
          value={formData.author || ''}
          onChange={(e) => onChange('author', e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Date:</label>
        <Input
          type="date"
          value={formData.date || ''}
          onChange={(e) => onChange('date', e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <Button href="/board" color="outline">
          목록
        </Button>
        <Button type="button" onClick={onSubmit}>
          {isSubmitting ? '생성' : '수정'}
        </Button>
      </div>
    </div>
  );
};
