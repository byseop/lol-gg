import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export default function SearchInput() {
  const [input, setInput] = useState<string>('');
  const history = useHistory();

  const handleClickSearch = useCallback(
    (input) => {
      history.push(`/stats/${input}`);
    },
    [history]
  );

  return (
    <SearchInputDiv>
      <input
        placeholder="소환사 명"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="button" onClick={() => handleClickSearch(input)}>
        검색
      </button>
    </SearchInputDiv>
  );
}

const SearchInputDiv = styled.div`
  input {
    display: block;
    margin: auto;
    height: 50px;
  }
`;
