import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  registerUser, clearError, clearRegisterSuccess,
  selectAuthLoading, selectAuthError, selectRegisterSuccess
} from '../store/authSlice'
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiCheck } from 'react-icons/fi'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)
  const registerSuccess = useSelector(selectRegisterSuccess)

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    if (registerSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearRegisterSuccess())
        navigate('/login')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [registerSuccess, dispatch, navigate])

  useEffect(() => {
    return () => { dispatch(clearError()); dispatch(clearRegisterSuccess()) }
  }, [dispatch])

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    return errs
  }

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setValidationErrors((errs) => ({ ...errs, [field]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setValidationErrors(errs); return }
    dispatch(registerUser({ name: form.name, email: form.email, password: form.password }))
  }

  const fields = [
    {
      id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe',
      icon: <FiUser className="text-sm" />, value: form.name, onChange: handleChange('name'),
    },
    {
      id: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com',
      icon: <FiMail className="text-sm" />, value: form.email, onChange: handleChange('email'),
    },
    {
      id: 'password', label: 'Password', type: showPassword ? 'text' : 'password',
      placeholder: '••••••••', icon: <FiLock className="text-sm" />,
      value: form.password, onChange: handleChange('password'),
      toggle: () => setShowPassword((v) => !v), showToggle: showPassword,
    },
    {
      id: 'confirmPassword', label: 'Confirm Password', type: showConfirm ? 'text' : 'password',
      placeholder: '••••••••', icon: <FiLock className="text-sm" />,
      value: form.confirmPassword, onChange: handleChange('confirmPassword'),
      toggle: () => setShowConfirm((v) => !v), showToggle: showConfirm,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left form panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-16 bg-white order-2 lg:order-1">
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
            Create your account
          </h1>
          <p className="text-sm text-neutral-500 mb-8">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold transition-colors"
              style={{ color: 'var(--color-primary-600)' }}>
              Sign in
            </Link>
          </p>

          {/* Success state */}
          {registerSuccess && (
            <div className="flex items-center gap-3 p-4 rounded-xl mb-6 animate-scale-in"
              style={{ background: 'oklch(97% 0.04 145)', border: '1px solid oklch(85% 0.10 145)' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--color-success)' }}>
                <FiCheck className="text-white text-xs" />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'oklch(40% 0.15 145)' }}>Account created!</p>
                <p className="text-xs" style={{ color: 'oklch(50% 0.12 145)' }}>Redirecting you to login...</p>
              </div>
            </div>
          )}

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

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ id, label, type, placeholder, icon, value, onChange, toggle, showToggle }) => (
              <div key={id}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">{icon}</span>
                  <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-${toggle ? '10' : '4'} py-3 rounded-xl text-sm border placeholder-neutral-400 transition-all ${validationErrors[id] ? 'border-red-400 bg-red-50' : 'border-neutral-200 bg-white'}`}
                    disabled={registerSuccess}
                  />
                  {toggle && (
                    <button type="button" onClick={toggle}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors">
                      {showToggle ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                    </button>
                  )}
                </div>
                {validationErrors[id] && (
                  <p className="text-xs mt-1.5" style={{ color: 'var(--color-error)' }}>{validationErrors[id]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading || registerSuccess}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-2"
              style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))' }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account <FiArrowRight className="text-sm" /></>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-5/12 p-12 relative overflow-hidden order-1 lg:order-2"
        style={{ background: 'linear-gradient(150deg, var(--color-secondary-600) 0%, var(--color-primary-700) 100%)' }}>
        <div className="absolute top-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full opacity-10"
          style={{ background: 'white' }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-[280px] h-[280px] rounded-full opacity-10"
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
            Start shortening.<br />Start growing.
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Create your free account and get access to powerful link management tools with detailed analytics.
          </p>
          {['Completely free to start', 'Track every click & visitor', 'Clean, simple dashboard'].map((f) => (
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
    </div>
  )
}

export default RegisterPage
