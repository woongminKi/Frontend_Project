import React from 'react';
import SearchInput from './SearchInput';

export default function Header({ onKeywordChange }: any) {
  return (
    <>
      <SearchInput onKeywordChange={onKeywordChange} />
    </>
  )
}
