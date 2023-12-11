import { Ticket } from '../interfaces'

export const getUltimos = async () => {
  const resp = await fetch('http://localhost:3000/tickets')
  const data: Ticket[] = await resp.json()
  return data
}
