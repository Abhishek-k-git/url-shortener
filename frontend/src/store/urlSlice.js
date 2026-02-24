import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllUrlsApi, shortenUrlApi } from '../api/urlApi'

export const fetchAllUrls = createAsyncThunk(
  'urls/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllUrlsApi()
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch URLs')
    }
  }
)

export const shortenUrl = createAsyncThunk(
  'urls/shorten',
  async (originalUrl, { rejectWithValue }) => {
    try {
      const { data } = await shortenUrlApi(originalUrl)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to shorten URL')
    }
  }
)

const urlSlice = createSlice({
  name: 'urls',
  initialState: {
    urls: [],
    loading: false,
    shortenLoading: false,
    error: null,
    lastShortened: null,
  },
  reducers: {
    clearLastShortened(state) {
      state.lastShortened = null
    },
    clearUrlError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUrls.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllUrls.fulfilled, (state, { payload }) => {
        state.loading = false
        state.urls = payload
      })
      .addCase(fetchAllUrls.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(shortenUrl.pending, (state) => {
        state.shortenLoading = true
        state.error = null
      })
      .addCase(shortenUrl.fulfilled, (state, { payload }) => {
        state.shortenLoading = false
        state.lastShortened = payload
        // Prepend to list
        state.urls = [payload, ...state.urls.filter(u => u.id !== payload.id)]
      })
      .addCase(shortenUrl.rejected, (state, { payload }) => {
        state.shortenLoading = false
        state.error = payload
      })
  },
})

export const { clearLastShortened, clearUrlError } = urlSlice.actions

export const selectUrls         = (state) => state.urls.urls
export const selectUrlsLoading  = (state) => state.urls.loading
export const selectShortenLoading = (state) => state.urls.shortenLoading
export const selectLastShortened = (state) => state.urls.lastShortened
export const selectUrlError     = (state) => state.urls.error

export default urlSlice.reducer
