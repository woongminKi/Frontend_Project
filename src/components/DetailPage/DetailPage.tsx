import React from 'react';
import { useParams } from 'react-router-dom';
import { optionLists } from 'app/App';

export default function DetailPage({ lists }: { lists: optionLists[] }) {
  const { id } = useParams();
  const item = lists.find((item) => item.club.id === id);

  return (
    <>
      {item &&
      <>
        <img src={ item.club.coverUrl } alt='메인 이미지' />
        <h2>{ item.club.name }</h2>
        <p>클럽 유형: { item.club.type }</p>
        <p>장소: { item.club.place }</p>
        <p>가격: { item.price }원</p>
        <p>{ item.club.description }</p>
      </>
      }
    </>
  )
}
