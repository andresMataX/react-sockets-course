import { SaveOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Typography } from 'antd'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useHideMenu } from '../hooks'
import { useAgentStore } from '../stores'

const { Title, Text } = Typography

type FieldType = {
  agente?: string
  escritorio?: string
}

interface Props {}

export const IngresarPage: FC<Props> = () => {
  useHideMenu(false)

  const setAgente = useAgentStore((state) => state.setAgente)
  const setEscritorio = useAgentStore((state) => state.setEscritorio)
  const agente = useAgentStore((state) => state.agente)
  const escritorio = useAgentStore((state) => state.escritorio)

  const onFinish = ({ agente, escritorio }: FieldType) => {
    setAgente(agente || '')
    setEscritorio(escritorio || '')
  }

  if (agente && escritorio) {
    return <Navigate to='/escritorio' />
  }

  return (
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su nombre y número de escritorio para ser atendido.</Text>

      <Divider />

      <Form
        name='basic'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='Nombre del agente'
          name='agente'
          rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Escritorio'
          name='escritorio'
          rules={[
            {
              required: true,
              message: 'Por favor ingresa el número de escritorio',
            },
          ]}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
