import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsAuthenticated, selectCurrentUser, logout } from '../store/authSlice'
import { FiMenu, FiX, FiLogOut, FiUser, FiBarChart2 } from 'react-icons/fi'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectCurrentUser)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const isLandingPage = location.pathname === '/'
  const navbarBase = `fixed top-0 left-0 right-0 z-50 transition-all duration-300`
  const navbarBg = scrolled || !isLandingPage
    ? 'bg-white/90 backdrop-blur-lg border-b border-neutral-200/60 shadow-sm'
    : 'bg-transparent'

  return (
    <header className={`${navbarBase} ${navbarBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            {/* <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
              <FiLink2 className="text-white text-base" />
            </div> */}
            {/* <span
              className="text-lg font-bold font-assistant text-gradient"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              leenke
            </span> */}
            <h1 className="text-xl font-bold tracking-tighter" style={{ fontFamily: 'Pacifico, cursive' }}>
              leenke
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                    }`
                  }
                >
                  Login
                </NavLink>
                <Link
                  to="/register"
                  className="ml-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-primary text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))' }}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                    }`
                  }
                >
                  <FiBarChart2 className="text-sm" />
                  Dashboard
                </NavLink>
                <div className="flex items-center gap-2 ml-3 pl-3 border-l border-neutral-200">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700">
                    <div className="w-7 h-7 rounded-full bg-gradient-primary flex items-center justify-center">
                      <FiUser className="text-white text-xs" />
                    </div>
                    <span className="text-sm font-medium max-w-32 truncate">
                      {user?.name || user?.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-150"
                    title="Logout"
                  >
                    <FiLogOut className="text-sm" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-lg border-t border-neutral-100 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive ? 'text-primary-600 bg-primary-50' : 'text-neutral-700 hover:bg-neutral-50'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive ? 'text-primary-600 bg-primary-50' : 'text-neutral-700 hover:bg-neutral-50'
                  }`
                }
              >
                Login
              </NavLink>
              <Link
                to="/register"
                className="block text-center mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))' }}
              >
                Get Started Free
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-50">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <FiUser className="text-white text-sm" />
                </div>
                <span className="text-sm font-medium text-primary-700 truncate">
                  {user?.name || user?.email}
                </span>
              </div>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive ? 'text-primary-600 bg-primary-50' : 'text-neutral-700 hover:bg-neutral-50'
                  }`
                }
              >
                <FiBarChart2 /> Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <FiLogOut /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
