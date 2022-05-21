import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchInput from 'components/Header/SearchInput';
import List from 'components/List';

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

function App() {
  const [keyword, setKeyword] = useState([]);
  const [apiDataList, setApiDataList] = useState<optionLists[]>([]);
  const [list, setList] = useState<optionLists[]>([]);
  const [remainList, setRemainList] = useState<optionLists[]>([]);
  const [checkType, setCheckType] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('https://api.json-generator.com/templates/ePNAVU1sgGtQ/data', {
        headers: {
          'Authorization': 'Bearer 22swko029o3wewjovgvs9wcqmk8p3ttrepueemyj'
        }
      });
      setApiDataList(data);
      setList(data.slice(0, 9));
      setRemainList(data.slice(9));
      setIsFetching(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const infinityScroll = (): void => {
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

      if (scrollTop + clientHeight >= scrollHeight && isFetching === false) {
        fetchAddData();
      }
    };

    window.addEventListener('scroll', infinityScroll);

    return () => {
      window.removeEventListener('scroll', infinityScroll);
    }
  }, [isFetching, remainList, list]);

  const handleCheckType = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCheckType(e.target.value);
  };

  const createdOptions = (
    value: keyof optionLists['club'],
    onChange: React.FormEventHandler
  ) => {
    const typeArray: string[] = [];

    if (apiDataList) {
      apiDataList.map((list) => typeArray.push(list.club[value]));
    }

    const typeList = Array.from(new Set(typeArray));

    return (
      <select name={value} onChange={onChange} defaultValue='default'>
        <option value='default' disabled>
          {value}
        </option>
        {typeList.map((type) => (
          <option value={type} key={type}>
            {type}
          </option>
        ))}
      </select>
    );
  };

  return (
    <>
      <form>
        {createdOptions('place', handleCheckType)}
        {createdOptions('type', handleCheckType)}
      </form>
      <SearchInput onKeywordChange={setKeyword} />

      <List lists={list} />
    </>
  );
}

export default App;