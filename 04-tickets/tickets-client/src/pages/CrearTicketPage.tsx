import { DownloadOutlined } from '@ant-design/icons'
import { Button, Col, Row, Typography } from 'antd'
import { FC, useState } from 'react'
import { useHideMenu, useSocket } from '../hooks'
import { Ticket } from '../interfaces'

const { Title, Text } = Typography

interface Props {}

export const CrearTicketPage: FC<Props> = () => {
  const { socket } = useSocket()
  const [ticket, setTicket] = useState<Ticket>()

  useHideMenu(true)

  const onNuevoTicket = () => {
    socket?.emit('solicitar-ticket', null, (ticket: Ticket) => {
      setTicket(ticket)
    })
  }

  return (
    <>
      <Row>
        <Col
          span={14}
          offset={6}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Title level={3} style={{ textAlign: 'center' }}>
            Presione el botón para generar un nuevo ticket
          </Title>

          <Button
            type='primary'
            shape='round'
            icon={<DownloadOutlined />}
            size='large'
            onClick={onNuevoTicket}
          >
            Nuevo ticket
          </Button>
        </Col>
      </Row>

      <Row style={{ marginTop: 100 }}>
        <Col
          span={14}
          offset={6}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: 100,
            alignItems: 'center',
          }}
        >
          <Title level={2}>Su número</Title>
          <Text type='success' style={{ fontSize: 55 }}>
            {ticket?.numero || '...'}
          </Text>
        </Col>
      </Row>
    </>
  )
}
