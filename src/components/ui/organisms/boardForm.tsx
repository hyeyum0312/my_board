'use client';
import { useState } from 'react';
import Input from '../atom/Input';
import Button from '../atom/Button';

export const BoardForm = () => {
  const [formType, setFormType] = useState('create');
  return (
    <form>
      <label>제목</label>
      <Input type="text" />

      <label>작성자</label>
      <Input type="text" />

      <label>작성일</label>
      <Input type="text" />

      <textarea></textarea>
      <Button href="/board" color="outline">
        목록
      </Button>
      <Button type="submit">{formType === 'create' ? '생성' : '수정'}</Button>
    </form>
  );
};
