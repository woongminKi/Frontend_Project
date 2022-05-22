import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { optionLists } from '../../app/App';

export default function List({ lists }: { lists: optionLists[] }) {
  const navigate = useNavigate();

  return (
    <CardWrapper>
      {lists.map((list: any) => (
        <Card key={ list.club.id } onClick={() => navigate(`detail/${list.club.id}`)}>
          <div>
            <img src={ list.club.coverUrl } alt='메인 썸네일 이미지'/>
          </div>
          <TextWrapper>
            <h2>{ list.club.name }</h2>
            <p>{ list.club.description }</p>
            <p>{ list.price }원</p>
            <hr />
            <span>✅클럽: { list.club.type }</span>
            <span>✅장소: { list.club.place }</span>
          </TextWrapper>
        </Card>
      ))}
    </CardWrapper>
  );
}

const CardWrapper = styled('div')`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 400px);
  gap: 10px;
`;

const Card = styled('div')`
  position: relative;
  width: 100%;

  img {
    width: 400px;
    height: 400px;
  }
  &:hover {
    cursor: pointer;
    transform: translateY(-6px);
    transition: 0.3s;
  }
`;

const TextWrapper = styled('div')`
  width: 100%;
  margin-left: 10px;

  span {
    margin-right: 8px;
  }
`;
