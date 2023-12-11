import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Row, Typography } from 'antd'
import { FC, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useHideMenu, useSocket } from '../hooks'
import { Ticket } from '../interfaces'
import { useAgentStore } from '../stores'

const { Title, Text } = Typography

interface Props {}

export const EscritorioPage: FC<Props> = () => {
  const { socket } = useSocket()
  const [ticket, setTicket] = useState<Ticket>()

  useHideMenu(false)

  const agente = useAgentStore((state) => state.agente)
  const escritorio = useAgentStore((state) => state.escritorio)
  const logout = useAgentStore((state) => state.logout)

  const onNextTicket = () => {
    socket.emit(
      'siguiente-ticket-trabajar',
      { agente, escritorio },
      (ticket: Ticket) => {
        setTicket(ticket)
      }
    )
  }

  if (!agente && !escritorio) {
    return <Navigate to='/ingresar' />
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{agente}</Title>

          <Text>Usted está trabajando en el escritorio: </Text>

          <Text type='success'>{escritorio}</Text>
        </Col>

        <Col span={4}>
          <Button shape='round' type='primary' onClick={() => logout()} danger>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col>
          <Text>Está atendiendo el ticket número: </Text>
          <Text style={{ fontSize: 30 }} type='danger'>
            {ticket?.numero || 'No hay tickets pendientes'}
          </Text>
        </Col>
      </Row>

      <Row>
        <Col offset={18} span={6}>
          <Button shape='round' type='primary' onClick={onNextTicket}>
            Siguiente
            <RightOutlined />
          </Button>
        </Col>
      </Row>
    </>
  )
}
