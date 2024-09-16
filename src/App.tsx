import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routers from './routers/Routers';
import { ConfigProvider, message } from 'antd';
import { Provider } from 'react-redux';
import store from './redux/store';

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
      <Provider store={store}>
        <Routers/>
      </Provider>
    </ConfigProvider>

  );
}

export default App;
