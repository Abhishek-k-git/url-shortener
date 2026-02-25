import { Link } from 'react-router-dom'
import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              {/* <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
                style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))' }}>
                <FiLink2 className="text-white text-base" />
              </div> */}
              {/* <span className="text-lg font-bold font-assistant text-gradient"
                style={{ fontFamily: 'var(--font-display)' }}>
                leenke
              </span> */}
              <h1 className="text-xl font-bold tracking-tighter" style={{ fontFamily: 'Pacifico, cursive' }}>
                leenke
              </h1>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
              The fastest and most reliable URL shortener. Create, manage, and track your links in one place.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://x.com/" className="p-2 rounded-lg text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-150">
                <FiTwitter className="text-base" />
              </a>
              <a href="https://github.com/Abhishek-k-git" className="p-2 rounded-lg text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-150">
                <FiGithub className="text-base" />
              </a>
              <a href="mailto:abhishekpatel66029@gmail.com" className="p-2 rounded-lg text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-150">
                <FiMail className="text-base" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-800 mb-4">Product</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', to: '/' },
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'Register', to: '/register' },
                { label: 'Login', to: '/login' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-neutral-500 hover:text-primary-600 transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-800 mb-4">Features</h4>
            <ul className="space-y-2.5">
              {['URL Shortening', 'Click Analytics', 'Date Range Reports', 'Secure & Fast', 'REST API'].map((f) => (
                <li key={f} className="text-sm text-neutral-500">{f}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-400">
            © {year} leenke. Built with ❤️ using Spring Boot & React.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-400 hover:text-neutral-600 cursor-pointer transition-colors">Privacy</span>
            <span className="text-xs text-neutral-400 hover:text-neutral-600 cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer