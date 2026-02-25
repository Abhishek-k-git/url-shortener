import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../store/authSlice'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  FiLink2, FiBarChart2, FiShield, FiZap, FiArrowRight,
  FiCheck, FiGlobe, FiTrendingUp, FiClock
} from 'react-icons/fi'

const FEATURES = [
  {
    icon: <FiZap className="text-xl" />,
    title: 'Lightning Fast',
    desc: 'Generate short links in milliseconds. No lag, no waiting.',
    color: 'warning',
  },
  {
    icon: <FiBarChart2 className="text-xl" />,
    title: 'Rich Analytics',
    desc: 'Track clicks over time with beautiful charts and date-range filters.',
    color: 'primary',
  },
  {
    icon: <FiShield className="text-xl" />,
    title: 'Secure & Reliable',
    desc: 'JWT-protected accounts. Your links are always safe with us.',
    color: 'accent',
  },
]

const STEPS = [
  { step: '01', title: 'Create an Account', desc: 'Sign up for free in seconds. No credit card required.' },
  { step: '02', title: 'Paste Your URL', desc: 'Enter any long URL into the dashboard shortener form.' },
  { step: '03', title: 'Share & Track', desc: 'Share the short link and watch the analytics roll in.' },
]

const STATS = [
  { icon: <FiLink2 />, value: '∞', label: 'Links Created' },
  { icon: <FiTrendingUp />, value: '100%', label: 'Uptime' },
  { icon: <FiGlobe />, value: 'Global', label: 'Redirect Speed' },
  { icon: <FiClock />, value: '<50ms', label: 'Response Time' },
]

const LandingPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-hero relative overflow-hidden pt-32 pb-24 px-4">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid mask-radial-faded opacity-40 pointer-events-none" />

        {/* Decorative blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full opacity-30 blur-3xl pointer-events-none animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, var(--color-primary-300), transparent)' }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--color-secondary-300), transparent)' }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 animate-fade-down"
            style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
            <span className="w-2 h-2 rounded-full animate-bounce-soft"
              style={{ background: 'var(--color-primary-500)' }} />
            Free URL Shortener · No Credit Card Required
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up"
            style={{ fontFamily: 'var(--font-display)' }}>
            Shorten URLs.{' '}
            <span className="text-gradient">Track Clicks.</span>
            <br />Grow Faster.
          </h1>

          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
            leenke turns your long, messy URLs into clean short links with powerful analytics dashboards —
            so you always know who's clicking and when.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up delay-300">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))' }}
              >
                Go to Dashboard <FiArrowRight />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))' }}
                >
                  Start for Free <FiArrowRight />
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold border border-neutral-200 text-neutral-700 bg-white hover:border-primary-300 hover:text-primary-600 hover:-translate-y-1 transition-all duration-200"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-10 animate-fade-up delay-400">
            {['No credit card', 'Free forever', 'Unlimited links'].map((b) => (
              <div key={b} className="flex items-center gap-1.5 text-xs text-neutral-500">
                <FiCheck className="text-xs" style={{ color: 'var(--color-accent-500)' }} />
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Floating URL demo card */}
        <div className="max-w-lg mx-auto mt-16 animate-float delay-200 px-4">
          <div className="card-base p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map(c => (
                  <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                ))}
              </div>
              <div className="flex-1 h-2 rounded-full bg-neutral-100" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50">
                <span className="text-xs text-neutral-400 font-medium">Long URL:</span>
                <span className="text-xs text-neutral-600 truncate font-mono">https://example.com/blog/2024/jan/how-to-get-started-with-advanced-seo</span>
              </div>
              <div className="flex items-center justify-center py-1">
                <div className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--color-primary-100)' }}>
                  <FiArrowRight className="text-xs" style={{ color: 'var(--color-primary-600)' }} />
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl"
                style={{ background: 'var(--color-primary-50)' }}>
                <span className="text-xs font-medium" style={{ color: 'var(--color-primary-500)' }}>Short URL:</span>
                <span className="text-xs font-mono font-bold" style={{ color: 'var(--color-primary-700)' }}>leenke.netlify.app/aB3xYz</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: 'var(--color-accent-100)', color: 'var(--color-accent-700)' }}>
                  142 clicks
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="py-14 px-4 border-y border-neutral-100" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ icon, value, label }, i) => (
            <div key={label} className={`text-center animate-fade-up delay-${(i + 1) * 100}`}>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3"
                style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-600)' }}>
                {icon}
              </div>
              <div className="text-2xl font-bold text-neutral-800 mb-1" style={{ fontFamily: 'var(--font-display)' }}>{value}</div>
              <div className="text-xs text-neutral-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{ background: 'var(--color-secondary-100)', color: 'var(--color-secondary-700)' }}>
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Everything you need to{' '}
              <span className="text-gradient">grow your reach</span>
            </h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              Simple tools, powerful results. Whether you're a marketer, developer, or creator — leenke has you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map(({ icon, title, desc, color }, i) => (
              <div
                key={title}
                className={`card-base p-7 hover-lift group animate-fade-up delay-${(i + 1) * 200}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
                  style={{
                    background: color === 'primary'
                      ? 'linear-gradient(135deg, var(--color-primary-100), var(--color-primary-50))'
                      : color === 'warning'
                      ? 'linear-gradient(135deg, oklch(95% 0.08 75), oklch(98% 0.04 75))'
                      : 'linear-gradient(135deg, var(--color-accent-100), var(--color-accent-50))',
                    color: color === 'primary'
                      ? 'var(--color-primary-600)'
                      : color === 'warning'
                      ? 'oklch(60% 0.18 75)'
                      : 'var(--color-accent-600)',
                  }}>
                  {icon}
                </div>
                <h3 className="text-base font-semibold text-neutral-800 mb-2" style={{ fontFamily: 'var(--font-display)' }}>{title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{ background: 'var(--color-accent-100)', color: 'var(--color-accent-700)' }}>
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800" style={{ fontFamily: 'var(--font-display)' }}>
              Up and running in <span className="text-gradient-accent">3 steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map(({ step, title, desc }, i) => (
              <div key={step} className={`relative text-center animate-fade-up delay-${(i + 1) * 200}`}>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+36px)] right-0 h-px"
                    style={{ background: 'linear-gradient(to right, var(--color-primary-200), transparent)' }} />
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-xl font-black mb-5 shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))',
                    color: 'white',
                    fontFamily: 'var(--font-display)',
                  }}>
                  {step}
                </div>
                <h3 className="text-base font-semibold text-neutral-800 mb-2" style={{ fontFamily: 'var(--font-display)' }}>{title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-3xl p-12 relative overflow-hidden animate-scale-in"
            style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-600))' }}>
            <div className="absolute inset-0 opacity-10 animate-spin-slow"
              style={{ background: 'radial-gradient(circle at top right, white, transparent)' }} />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Ready to shrink your URLs?
              </h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                Join thousands of teams using leenke to manage and track their links. Free forever.
              </p>
              <Link
                to={isAuthenticated ? '/dashboard' : '/register'}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-white hover:bg-neutral-50 hover:-translate-y-1 shadow-lg hover:shadow-xl transition-all duration-200"
                style={{ color: 'var(--color-primary-600)' }}
              >
                {isAuthenticated ? 'Open Dashboard' : 'Get Started — It\'s Free'}
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage
