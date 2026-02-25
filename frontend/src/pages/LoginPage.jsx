import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  loginUser, clearError,
  selectAuthLoading, selectAuthError, selectIsAuthenticated
} from '../store/authSlice'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  useEffect(() => {
    return () => { dispatch(clearError()) }
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) return
    dispatch(loginUser({ email, password }))
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-5/12 p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(150deg, var(--color-primary-600) 0%, var(--color-secondary-700) 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute top-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full opacity-10"
          style={{ background: 'white' }} />
        <div className="absolute bottom-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full opacity-10"
          style={{ background: 'white' }} />

        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          {/* <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            <FiLink2 className="text-white text-base" />
          </div> */}
          {/* <span className="text-white text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>leenke</span> */}
          <h1 className="text-xl font-bold tracking-tighter" style={{ fontFamily: 'Pacifico, cursive' }}>
            leenke
          </h1>
        </Link>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Welcome back!<br />Good to see you.
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Log in to access your dashboard, manage all your short links, and view real-time click analytics.
          </p>
          {/* Feature bullets */}
          {['Unlimited short URLs', 'Real-time click analytics', 'Secure JWT authentication'].map((f) => (
            <div key={f} className="flex items-center gap-2.5 text-white/80 text-sm mb-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {f}
            </div>
          ))}
        </div>

        <p className="text-white/40 text-xs relative z-10">© {new Date().getFullYear()} leenke</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-16 bg-white">
        {/* Mobile logo */}
        <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
          {/* <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))' }}>
            <FiLink2 className="text-white text-sm" />
          </div> */}
          {/* <span className="font-bold text-lg text-gradient" style={{ fontFamily: 'var(--font-display)' }}>leenke</span> */}
          <h1 className="text-xl font-bold tracking-tighter" style={{ fontFamily: 'Pacifico, cursive' }}>
            leenke
          </h1>
        </Link>

        <div className="w-full max-w-md animate-fade-up">
          <h1 className="text-2xl font-bold text-neutral-800 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            Sign in to your account
          </h1>
          <p className="text-sm text-neutral-500 mb-8">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold transition-colors"
              style={{ color: 'var(--color-primary-600)' }}>
              Create one free
            </Link>
          </p>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 p-4 rounded-xl mb-6 text-sm animate-scale-in"
              style={{ background: 'oklch(97% 0.02 25)', color: 'var(--color-error)', border: '1px solid oklch(90% 0.06 25)' }}>
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3.5c.41 0 .75.34.75.75v3.5a.75.75 0 0 1-1.5 0v-3.5c0-.41.34-.75.75-.75zm0 7a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Email address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-neutral-200 bg-white placeholder-neutral-400 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-neutral-700">Password</label>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl text-sm border border-neutral-200 bg-white placeholder-neutral-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-2"
              style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))' }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <FiArrowRight className="text-sm" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-neutral-400 mt-8">
            By signing in, you agree to our{' '}
            <span className="underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
