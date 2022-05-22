import React from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { optionLists } from 'app/App';

export default function DetailPage({ lists }: { lists: optionLists[] }) {
  const { id } = useParams();
  const item = lists.find((item) => item.club.id === id);

  return (
    <>
      {item &&
        <DetailWrapper>
          <TitleDiv>상세 페이지</TitleDiv>
          <img src={ item.club.coverUrl } alt='메인 이미지' />
          <h2>제목: { item.club.name }</h2>
          <p>클럽 유형: { item.club.type }</p>
          <p>장소: { item.club.place }</p>
          <p>가격: { item.price }원</p>
          <p>{ item.club.description }</p>
        </DetailWrapper>
      }
    </>
  );
}

const DetailWrapper = styled('div')`
  width: 100%;
  height: 100vh;
  margin-top: 1rem;
  border: 2px solid lightcoral;
  justify-content: center;
  text-align: center;

  img {
    width: 50%;
    height: 50%;
  }
`;

const TitleDiv = styled('div')`
  margin: 1rem 0 1rem 0;
  font-size: 30px;
  font-weight: bold;
  color: lightcoral;
`;
