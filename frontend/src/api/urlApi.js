import axiosInstance from './axiosInstance'

export const getAllUrlsApi = () =>
  axiosInstance.get('/urls/getall')

export const shortenUrlApi = (originalUrl) =>
  axiosInstance.post('/urls/short', { originalUrl })

export const getClicksApi = (startDate, endDate) =>
  axiosInstance.get('/urls/clicks', { params: { startDate, endDate } })

export const getUrlAnalyticsApi = (shortUrl, startDate, endDate) =>
  axiosInstance.get(`/urls/analytics/${shortUrl}`, { params: { startDate, endDate } })

export const resolveUrlApi = (shortUrl) =>
  axiosInstance.get(`/${shortUrl}`)
