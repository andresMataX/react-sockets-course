import moment from 'moment'

export const getHoraMes = (date: string) => {
  const hoyMes = moment(date)

  return hoyMes.format('MMMM Do')
}
