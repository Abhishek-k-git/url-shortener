import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getClicksApi, getUrlAnalyticsApi } from '../api/urlApi'

export const fetchTotalClicks = createAsyncThunk(
  'analytics/fetchTotalClicks',
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const { data } = await getClicksApi(startDate, endDate)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch clicks')
    }
  }
)

export const fetchUrlAnalytics = createAsyncThunk(
  'analytics/fetchUrlAnalytics',
  async ({ shortUrl, startDate, endDate }, { rejectWithValue }) => {
    try {
      const { data } = await getUrlAnalyticsApi(shortUrl, startDate, endDate)
      return { shortUrl, data }
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch analytics')
    }
  }
)

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    clicksData: {},      // { "2024-01-01": 5, ... }
    urlAnalytics: null,  // { shortUrl, data: [{count, clickDate}] }
    loading: false,
    analyticsLoading: false,
    error: null,
  },
  reducers: {
    clearUrlAnalytics(state) {
      state.urlAnalytics = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalClicks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTotalClicks.fulfilled, (state, { payload }) => {
        state.loading = false
        state.clicksData = payload
      })
      .addCase(fetchTotalClicks.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(fetchUrlAnalytics.pending, (state) => {
        state.analyticsLoading = true
        state.error = null
      })
      .addCase(fetchUrlAnalytics.fulfilled, (state, { payload }) => {
        state.analyticsLoading = false
        state.urlAnalytics = payload
      })
      .addCase(fetchUrlAnalytics.rejected, (state, { payload }) => {
        state.analyticsLoading = false
        state.error = payload
      })
  },
})

export const { clearUrlAnalytics } = analyticsSlice.actions

export const selectClicksData       = (state) => state.analytics.clicksData
export const selectUrlAnalytics     = (state) => state.analytics.urlAnalytics
export const selectAnalyticsLoading = (state) => state.analytics.loading
export const selectAnalyticsError   = (state) => state.analytics.error
export const selectUrlAnalyticsLoading = (state) => state.analytics.analyticsLoading

export default analyticsSlice.reducer
