import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';

export default function SearchInput({ onKeywordChange }: any) {
  const [keyword, setKeyword] = useState('');

  const handleChangeText = useCallback((keyword: string) => {
    onKeywordChange(keyword);
  }, [keyword]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleChangeText(keyword);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input type="text" value={keyword} onChange={(e) => onChange(e)} placeholder="검색어를 입력하세요" />
      </form>
    </>
  );
}

const Input = styled('input')`
  width: 170px;
  height: 32px;
  border: 0;
  border-radius: 15px;
  background-color: #E9E9E9;
  outline: none;
`;
