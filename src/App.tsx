import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routers from './routers/Routers';
import { ConfigProvider, message } from 'antd';

message.config({
  top : 30,
  duration : 2,
  maxCount : 3,
  rtl : true,
  prefixCls : 'my-message',
});

function App() {
  return (
    <ConfigProvider theme={{
      token : {},
      components : {}
    }}>
      <Routers/>
    </ConfigProvider>

  );
}

export default App;
