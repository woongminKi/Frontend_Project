import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

import SearchInput from 'components/Header/SearchInput';
import { apiData } from 'api/ApiData';
import List from '../components/List/List';
import DetailPage from '../components/DetailPage/DetailPage';

export interface optionLists {
  club: {
    coverUrl: string;
    description: string;
    id: string;
    name: string;
    place: string;
    type: string;
  };
  createdAt: string;
  leaders: string[];
  partners: string[];
  price: number;
}

export default function App() {
  const location = useLocation();
  const [keyword, setKeyword] = useState<string>('');
  const [apiDataList, setApiDataList] = useState<optionLists[]>([]);
  const [list, setList] = useState<optionLists[]>([]);
  const [remainList, setRemainList] = useState<optionLists[]>([]);
  const [originList, setOriginList] = useState<optionLists[]>([]);
  const [checkType, setCheckType] = useState<string>('');
  const [checkPlace, setCheckPlace] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const data = await apiData();

      setApiDataList(data);
      setList(data.slice(0, 9));
      setRemainList(data.slice(9));
      setOriginList(data.slice(0, 9));
      setIsLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      if (!list.length) {
        return;
      }

      const fetchAddData = () => {
        setList(list.concat(remainList.slice(0, 9)));
        setRemainList(remainList.slice(9));
      };

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
        fetchAddData();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [isLoading, remainList, list]);

  useEffect(() => {
    if (checkType && checkPlace) {
      const allFilteredList = list.filter((item) => {
        return (item.club.type ===checkType && item.club.place === checkPlace);
      });

      setList(allFilteredList);
    } else if (checkType) {
      const typeFilteredList = list.filter((item) => {
        return (item.club.type === checkType);
      });

      setList(typeFilteredList);
    } else {
      const placeFilteredList = list.filter((item) => {
        return (item.club.place === checkPlace);
      });

      setList(placeFilteredList);
    }
  }, [checkType, checkPlace]);

  useEffect(() => {
    if (keyword) {
      const keywordFilteredList = list.filter((item) => {
        if (keyword === item.club.name.split('-')[0].trim()) {
          return (keyword === item.club.name.split('-')[0].trim());
        } else if (keyword === item.club.name.split('-')[1].trim()) {
          return (keyword === item.club.name.split('-')[1].trim());
        } else if (keyword === item.club.place) {
          return (keyword === item.club.place);
        } else if (keyword === item.club.type) {
          return (keyword === item.club.type);
        }
      });

      setList(keywordFilteredList);
    } else {
      setList(originList);
    }
  }, [keyword]);

  const handleCheckType = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCheckType(e.target.value);
  };

  const handleCheckPlace = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCheckPlace(e.target.value);
  };

  const makeOptions = (
    value: keyof optionLists['club'],
    onChange: React.FormEventHandler
  ) => {
    const typeArray: string[] = [];

    if (apiDataList) {
      apiDataList.map((list) => typeArray.push(list.club[value]));
    }

    const typeList = Array.from(new Set(typeArray));

    return (
      <Select name={value} onChange={onChange} defaultValue='default'>
        <Option value='default' disabled>
          {value}
        </Option>
        {typeList.map((type) => (
          <Option value={type} key={type}>
            {type}
          </Option>
        ))}
      </Select>
    );
  };

  const handleRefreshList = (): void => {
    setList(originList);
    window.location.reload();
  };

  return (
    <>
      {!isLoading && location.pathname === '/' &&
        <HeaderWrapper>
          <Button onClick={handleRefreshList}>초기화</Button>
          <Form>
            {makeOptions('place', handleCheckPlace)}
            {makeOptions('type', handleCheckType)}
          </Form>
          <SearchInput onKeywordChange={setKeyword} />
        </HeaderWrapper>
      }

      {isLoading && <LoadingDiv>로딩중입니다...</LoadingDiv>}

      <Routes>
        <Route path='/' element={<List lists={list} />} />
        <Route path='/detail/:id' element={<DetailPage lists={list} />} />
      </Routes>
    </>
  );
}

const HeaderWrapper = styled('div')`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Form = styled('form')`
  margin-right: 10px;
`;

const Select = styled('select')`
  position: relative;
  width: 200px;
  height: 35px;
  background: transparent;
  border-radius: 4px;
  border: 2px solid lightcoral;
  margin-right: 10px;
  padding: 0 5px;
`;

const Option = styled('option')`
  background: lightcoral;
  color: #fff;
  padding: 3px 0;
  font-size: 16px;
`;

const LoadingDiv = styled('div')`
  margin-top: 340px;
  text-align: center;
  font-size: 50px;
`;

const Button = styled('button')`
  width: 100px;
  height: 35px;
  background: transparent;
  border-radius: 4px;
  border: 2px solid lightcoral;
  margin-right: 10px;
`;
