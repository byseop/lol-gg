import React from 'react';
import styled from 'styled-components';

// Inner: 공통 inner 컴포넌트

type InnerPropTypes = {
  children: React.ReactNode;
};

export default function Inner({ children }: InnerPropTypes) {
  return <CommonInner>{children}</CommonInner>;
}

const CommonInner = styled.div`
  width: 1300px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  box-sizing: border-box;
`;
