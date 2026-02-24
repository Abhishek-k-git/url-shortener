import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi, registerApi } from '../api/authApi'

// ── Helpers ──────────────────────────────────────────────────
const decodePayload = (token) => {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

// ── Thunks ────────────────────────────────────────────────────
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await loginApi(email, password)
      const token = data.token
      localStorage.setItem('token', token)
      const payload = decodePayload(token)
      return { token, user: { email: payload?.sub || email, name: payload?.name || email.split('@')[0] } }
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Login failed')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await registerApi(name, email, password)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Registration failed')
    }
  }
)

// ── Helpers to rehydrate from localStorage on app start ───────
const token = localStorage.getItem('token')
const initialUser = token ? (() => {
  const p = decodePayload(token)
  return p ? { email: p.sub, name: p.name || p.sub } : null
})() : null

// ── Slice ─────────────────────────────────────────────────────
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    token: token || null,
    loading: false,
    error: null,
    registerSuccess: false,
  },
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
      localStorage.removeItem('token')
    },
    clearError(state) {
      state.error = null
    },
    clearRegisterSuccess(state) {
      state.registerSuccess = false
    },
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.token = payload.token
        state.user = payload.user
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = typeof payload === 'string' ? payload : 'Invalid credentials'
      })
    // register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.registerSuccess = false
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
        state.registerSuccess = true
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = typeof payload === 'string' ? payload : 'Registration failed'
      })
  },
})

export const { logout, clearError, clearRegisterSuccess } = authSlice.actions

// Selectors
export const selectCurrentUser  = (state) => state.auth.user
export const selectToken        = (state) => state.auth.token
export const selectIsAuthenticated = (state) => !!state.auth.token
export const selectAuthLoading  = (state) => state.auth.loading
export const selectAuthError    = (state) => state.auth.error
export const selectRegisterSuccess = (state) => state.auth.registerSuccess

export default authSlice.reducer
