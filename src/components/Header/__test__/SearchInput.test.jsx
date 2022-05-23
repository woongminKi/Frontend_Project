import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../SearchInput';

test('검색창이 헤더 컴포넌트에서 잘 확인됩니다.', () => {
  render(<SearchInput />);
  expect(
    screen
      .getByPlaceholderText('검색어를 입력하세요')
      .getAttribute('placeholder')
  ).toBe('검색어를 입력하세요');
});

test('텍스트 입력한 것이 잘 확인됩니다.', () => {
  render(<SearchInput />);
  const searchedText = screen.getByRole('textbox');

  fireEvent.change(searchedText, {
    target: {
      value: '텍스트 검색',
    },
  });

  expect(screen.getByRole('textbox').getAttribute('value')).toBe('텍스트 검색');
});
