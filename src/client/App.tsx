import React from 'react';
import MainRoutes from './pages/MainRoutes';
import GlobalStyles from './globalStyles';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>LoL GG</title>
      </Helmet>
      <MainRoutes />
      <GlobalStyles />
    </div>
  );
}

export default App;
