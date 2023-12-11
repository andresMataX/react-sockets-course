import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import { FC } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUIStore } from '../stores'

const { Sider, Content } = Layout

interface Props {}

export const AppLayout: FC<Props> = () => {
  const isSidebarOpen = useUIStore((state) => state.isHidden)

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const navitage = useNavigate()

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider hidden={isSidebarOpen}>
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Ingresar',
              onClick: () => navitage('/ingresar'),
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Cola de tickets',
              onClick: () => navitage('/cola'),
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Crear ticket',
              onClick: () => navitage('/crear'),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
