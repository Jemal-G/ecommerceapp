import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import {
  HomeOutlined,
  ProfileOutlined,
  FileProtectOutlined,
} from '@ant-design/icons'

const Nav = ({ current, onSelect }) => {
  const location = useLocation()
  const pathKey = {
    '/': 'public',
    '/profile': 'profile',
    '/protected': 'protected',
  }[location.pathname] || 'public'

  const selectedKey = current || pathKey

  const items = [
    {
      key: 'public',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: 'protected',
      icon: <FileProtectOutlined />,
      label: <Link to="/protected">Protected</Link>,
    },
  ]

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[selectedKey]}
      items={items}
      onClick={(e) => onSelect && onSelect(e.key)}
    />
  )
}

export default Nav
