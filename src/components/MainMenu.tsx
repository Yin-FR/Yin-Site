import React from "react";
import { Menu } from 'antd';

const MainMenu: React.FC = () => {
  return (
    <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={['2']}
    items={new Array(3).fill(null).map((_, index) => ({
      key: String(index + 1),
      label: `nav ${index + 1}`,
    }))}
  />
  )
}


export default MainMenu;