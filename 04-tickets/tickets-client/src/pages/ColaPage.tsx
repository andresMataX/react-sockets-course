import { Col, Divider, List, Row, Typography } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useHideMenu, useSocket } from '../hooks'
import { Ticket } from '../interfaces'
import { getUltimos } from '../services'

const { Title, Text } = Typography

interface Props {}

export const ColaPage: FC<Props> = () => {
  useHideMenu(true)
  const { socket } = useSocket()
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    getUltimos().then(setTickets)
  }, [])

  useEffect(() => {
    socket.on('ticket-asignado', (tickets: Ticket[]) => {
      setTickets(tickets)
    })

    return () => {
      socket.off('ticket-asignado')
    }
  }, [socket])

  return (
    <>
      <Title level={1}>Atendiento al cliente</Title>

      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Title level={1} style={{ fontWeight: 'bold' }}>
                      No. {item.numero}
                    </Title>
                  }
                  description={
                    <>
                      <Text type='secondary'>En el escritorio: </Text>
                      <Text style={{ marginRight: 10 }} type='danger'>
                        {item.escritorio}
                      </Text>

                      <Text type='secondary'>Agente: </Text>
                      <Text style={{ marginRight: 10 }}>{item.agente}</Text>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Divider>Historial</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${item.numero}`}
                  description={
                    <>
                      <Text type='secondary'>En el escritorio: </Text>
                      <Text style={{ marginRight: 10 }} type='danger'>
                        {item.escritorio}
                      </Text>

                      <Text type='secondary'>Agente: </Text>
                      <Text style={{ marginRight: 10 }}>{item.agente}</Text>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  )
}
