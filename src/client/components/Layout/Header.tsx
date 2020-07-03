import React from 'react';
import styled from 'styled-components';
import SearchInputContainer from '../SearchInput';
import Inner from './Inner';

export default function Header() {
  return (
    <HeaderElement>
      <Inner>
        <SearchInputContainer />
      </Inner>
    </HeaderElement>
  );
}

const HeaderElement = styled.header`
  padding: 1rem 0;
  opacity: 0.3;
  transition: opacity 0.4s ease-out;

  &:hover {
    opacity: 1;
  }
`;
