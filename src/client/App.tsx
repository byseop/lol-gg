import React from 'react';
import MainRoutes from './pages/MainRoutes';
import GlobalStyles from './globalStyles';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import 'moment/locale/ko';

moment.locale('ko-kr');

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
