import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export default function SearchInput() {
  const [input, setInput] = useState<string>('');
  const history = useHistory();

  const goToStats = useCallback(
    (input: string) => {
      history.push(`/stats/${input}`);
    },
    [history]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.charCode === 13 && goToStats(input);
    },
    [goToStats, input]
  );

  return (
    <SearchInputDiv>
      <input
        placeholder="소환사 명"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button type="button" onClick={() => goToStats(input)}>
        검색
      </button>
    </SearchInputDiv>
  );
}

const SearchInputDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;

  input {
  }
`;
