import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  ProfileOutlined,
  FileProtectOutlined,
  AppstoreOutlined, 
} from '@ant-design/icons';

const navLinks = [
    {
      key: 'public',
      label: (<Link to="/">
        <HomeOutlined />
        Home
        </Link>
        ),
    },
    {
      key: 'profile',
      label: (<Link to="/profile">
        <ProfileOutlined />
        Profile
      </Link>),
    },
    {
      key: 'protected',
      label: (<Link to="/protected">
        <FileProtectOutlined />
        Protected
      </Link>),
    },
    {
      key: 'project05',
      label: (<Link to="/project05">
        <AppstoreOutlined />
        Project05
      </Link>),
    },
];

function Nav(props) {
  const [selected, setSelected] = useState('home'); // or your default
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split('/')[1];
    console.log(location);
    setSelected(currentPath ? currentPath : 'public');
  }, [location]);

  return (
    <div>
      <Menu
        selectedKeys={[selected]}
        items={navLinks}
        onClick={(e) => setSelected(e.key)}
        mode="horizontal"
      />
      <Outlet />
    </div>
  );
}

export default Nav;
