import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routers from './routers/Routers';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider theme={{
      token : {
        colorTextHeading : '#1570EF',
        
      },
      components : {}
    }}>
      <Routers/>
    </ConfigProvider>

  );
}

export default App;
