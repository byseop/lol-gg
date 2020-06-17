import React from 'react';
import logo from './logo.svg';
import './App.css';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const QUERY_EXAMPLE = gql`
  {
    summonerInfo(nickname: "삥뽕빵뽕뿡") {
      name
    }
  }
`;
const statsClient = new ApolloClient({ uri: '/.netlify/functions/stats' });

function App() {
  const { loading, error, data } = useQuery(QUERY_EXAMPLE, {
    client: statsClient
  });
  console.log(loading, error, data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
