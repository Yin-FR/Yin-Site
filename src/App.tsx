import React from 'react';
import './App.css';
import { Layout } from 'antd';
import MainMenu from './components/MainMenu';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './views/HomePage';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{background: "transparent"}}>
      <Header
        className='Main-header'
      >
        <MainMenu />
      </Header>
      <Content className="site-layout">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
      </Content>
    </Layout>
  );
}

export default App;
