import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-hero relative overflow-hidden">
    {/* Decorative blobs */}
    <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
      style={{ background: 'radial-gradient(circle, var(--color-primary-300), var(--color-secondary-300))' }} />

    {/* Logo */}
    <Link to="/" className="flex items-center gap-2 mb-12 animate-fade-down">
      {/* <div className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))' }}>
        <FiLink2 className="text-white text-base" />
      </div> */}
      {/* <span className="text-xl font-bold text-gradient" style={{ fontFamily: 'var(--font-display)' }}>linke</span> */}
      <h1 className="text-xl font-bold tracking-tighter" style={{ fontFamily: 'Pacifico, cursive' }}>
        linke
      </h1>
    </Link>

    {/* 404 number */}
    <div className="relative mb-6 animate-scale-in">
      <div className="text-[10rem] sm:text-[14rem] font-black leading-none select-none"
        style={{
          fontFamily: 'var(--font-display)',
          background: 'linear-gradient(135deg, var(--color-primary-200), var(--color-secondary-200))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
        404
      </div>
      {/* Floating emoji */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-7xl animate-bounce-soft select-none">
        🔗
      </div>
    </div>

    {/* Message */}
    <div className="text-center max-w-md animate-fade-up delay-200">
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-3"
        style={{ fontFamily: 'var(--font-display)' }}>
        Oops! Link not found
      </h1>
      <p className="text-neutral-500 text-sm leading-relaxed mb-8">
        The page you're looking for doesn't exist, was moved, or maybe the URL got a little too short.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))' }}
        >
          <FiArrowLeft className="text-sm" />
          Back to Home
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-neutral-200 text-neutral-700 bg-white hover:border-primary-300 hover:text-primary-600 hover:-translate-y-1 transition-all duration-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>

    {/* Decorative dots */}
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 animate-fade-up delay-400">
      {[0, 1, 2].map((i) => (
        <div key={i}
          className={`w-2 h-2 rounded-full animate-bounce-soft delay-${(i + 1) * 200}`}
          style={{ background: 'var(--color-primary-300)' }}
        />
      ))}
    </div>
  </div>
)

export default NotFoundPage
