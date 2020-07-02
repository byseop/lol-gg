import React from 'react';
import SearchInputContainer from '../SearchInput';
import styled from 'styled-components';

export default function Home() {
  return (
    <HomeDiv>
      <SearchInputContainer />
    </HomeDiv>
    );
}


const HomeDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
