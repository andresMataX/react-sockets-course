import axios from 'axios'
import { LoginAPI, MessageAPI } from '../interfaces'
import { useAuthStore } from '../stores'

const BASE_URL = 'http://localhost:3000'

const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const loginService = async (email: string, password: string) => {
  const { data } = await api.post<LoginAPI>('/auth', { email, password })
  return data
}

export const registerService = async (
  name: string,
  email: string,
  password: string
) => {
  const { data } = await api.post<LoginAPI>('/auth/new', {
    name,
    email,
    password,
  })
  return data
}

export const checkAuthStatusService = async () => {
  const { data } = await api.get<LoginAPI>('/auth/renew-token')
  return data
}

export const getMessagesByUser = async (id: string) => {
  const { data } = await api.get<MessageAPI[]>(`/messages/${id}`)
  return data
}
