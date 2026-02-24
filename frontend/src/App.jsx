import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from './store/authSlice'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'
import { resolveUrlApi } from './api/urlApi'

const AuthRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <AuthRoute><LoginPage /></AuthRoute>,
  },
  {
    path: '/register',
    element: <AuthRoute><RegisterPage /></AuthRoute>,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '/:shortId',
    loader: async ({ params }) => {
      try {
        const response = await resolveUrlApi(params.shortId)
        const originalUrl = response.headers['location'] || response.headers['Location']
        if (originalUrl) {
          window.location.replace(originalUrl)
          return null
        }
      } catch (err) {
        console.error('Redirection error:', err)
      }
      // If no URL found or error, go to 404
      throw new Response("Not Found", { status: 404 });
    },
    errorElement: <Navigate to="/404" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
