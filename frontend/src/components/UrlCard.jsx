import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiExternalLink, FiCopy, FiCheck, FiBarChart2, FiCalendar, FiMousePointer, FiLink } from 'react-icons/fi'
import { fetchUrlAnalytics } from '../store/analyticsSlice'
import { selectIsAuthenticated } from '../store/authSlice'

const UrlCard = ({ url, onAnalyticsClick }) => {
  const [copied, setCopied] = useState(false)
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const { originalUrl, shortUrl, clickCount, createdAt } = url

  const shortLink = `${window.location.origin}/${shortUrl}`
  const displayOriginal = originalUrl.length > 50 ? originalUrl.slice(0, 50) + '…' : originalUrl

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const handleAnalytics = () => {
    if (onAnalyticsClick) onAnalyticsClick(shortUrl)
  }

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '—'

  return (
    <div className="card-base p-5 hover-lift group animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--color-primary-100), var(--color-secondary-100))' }}>
            <FiLink style={{ color: 'var(--color-primary-600)' }} className="text-sm" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-neutral-400 font-medium mb-0.5">Original URL</p>
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors flex items-center gap-1 truncate max-w-56"
              title={originalUrl}
            >
              {displayOriginal}
              <FiExternalLink className="text-xs flex-shrink-0 opacity-60" />
            </a>
          </div>
        </div>
        {/* Click badge */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0"
          style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary-600)' }}>
          <FiMousePointer className="text-xs" />
          {clickCount}
        </div>
      </div>

      {/* Short URL */}
      <div className="flex items-center gap-2 p-3 rounded-xl mb-4"
        style={{ background: 'var(--color-surface-muted)' }}>
        <code className="text-sm font-mono flex-1 truncate"
          style={{ color: 'var(--color-primary-600)' }}>
          {shortLink}
        </code>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex-shrink-0"
          style={copied
            ? { background: 'var(--color-accent-100)', color: 'var(--color-accent-700)' }
            : { background: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }
          }
          title="Copy to clipboard"
        >
          {copied ? <FiCheck className="text-xs" /> : <FiCopy className="text-xs" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-neutral-400">
          <FiCalendar className="text-xs" />
          <span>{formattedDate}</span>
        </div>
        {isAuthenticated && (
          <button
            onClick={handleAnalytics}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary-700)' }}
          >
            <FiBarChart2 className="text-xs" />
            Analytics
          </button>
        )}
      </div>
    </div>
  )
}

export default UrlCard
