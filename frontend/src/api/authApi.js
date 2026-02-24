import axiosInstance from './axiosInstance'

export const loginApi = (email, password) =>
  axiosInstance.post('/auth/public/login', { email, password })

export const registerApi = (name, email, password) =>
  axiosInstance.post('/auth/public/register', { name, email, password })
