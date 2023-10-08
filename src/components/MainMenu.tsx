import React, { useState, useEffect } from "react";
import { Menu, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

interface menuItem {
  key: string;
  label: string
};

const menuItems: Array<menuItem> = [
  {
    key: "",
    label: "Home"
  },
  {
    key: "resume",
    label: "Resume"
  },
  {
    key: "portfolio",
    label: "Portfolio"
  },
  {
    key: "blog",
    label: "Blog"
  },
  {
    key: "photograph",
    label: "Photograph"
  },
  {
    key: "contact",
    label: "Contact"
  },
]

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [itemSelected, setItemSelected] = useState(location.pathname.slice(1));

  const selectItem: MenuProps['onClick'] = (params) => {
    navigate(params.key);
    setItemSelected(params.key);
  }

  useEffect(() => {
    setItemSelected(location.pathname.slice(1));
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemColor: "white",
            itemHoverColor: "#1677ff",
            activeBarHeight: 0
          },
        },
      }}
    >
      <Menu
        mode="horizontal"
        selectedKeys = {[itemSelected]}
        items={menuItems}
        className="menu"
        onClick={selectItem}
      />
    </ConfigProvider>

  )
}


export default MainMenu;