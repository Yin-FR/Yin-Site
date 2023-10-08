import React from 'react';
import './App.css';
import { Layout } from 'antd';
import MainMenu from './components/MainMenu';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './views/HomePage';
import ResumePage from './views/ResumePage';
import PortfolioPage from './views/PortfolioPage';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ background: "transparent" }}>
      <Header
        className='Main-header'
      >
        <MainMenu />
      </Header>
      <Content className="site-layout" id='main-element'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/resume' element={<ResumePage />} />
            <Route path='/portfolio' element={<PortfolioPage />} />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
      </Content>
    </Layout>
  );
}

export default App;
