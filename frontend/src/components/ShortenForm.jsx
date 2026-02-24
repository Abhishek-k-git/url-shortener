import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { shortenUrl, selectShortenLoading, selectLastShortened, clearLastShortened } from '../store/urlSlice'
import { FiLink, FiArrowRight, FiCheck, FiCopy, FiAlertCircle } from 'react-icons/fi'

const ShortenForm = () => {
  const dispatch = useDispatch()
  const loading = useSelector(selectShortenLoading)
  const lastShortened = useSelector(selectLastShortened)
  const [inputUrl, setInputUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [validationError, setValidationError] = useState('')

  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = inputUrl.trim()
    if (!trimmed) { setValidationError('Please enter a URL'); return }
    if (!isValidUrl(trimmed)) { setValidationError('Please enter a valid URL (include https://)'); return }
    setValidationError('')
    dispatch(clearLastShortened())
    dispatch(shortenUrl(trimmed))
    setInputUrl('')
  }

  const shortLink = lastShortened ? `${window.location.origin}/${lastShortened.shortUrl}` : null

  const handleCopy = async () => {
    if (!shortLink) return
    await navigator.clipboard.writeText(shortLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="card-base p-6 animate-fade-up">
      <h3 className="text-lg font-semibold text-neutral-800 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
        Shorten a New URL
      </h3>
      <p className="text-sm text-neutral-500 mb-5">Paste your long URL below to create a short link instantly.</p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiLink className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => { setInputUrl(e.target.value); setValidationError('') }}
            placeholder="https://example.com/very/long/url"
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-neutral-200 bg-white placeholder-neutral-400 text-neutral-800 transition-all duration-200 focus:border-primary-400"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))' }}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Shorten <FiArrowRight /></>
          )}
        </button>
      </form>

      {validationError && (
        <div className="flex items-center gap-2 mt-3 text-sm" style={{ color: 'var(--color-error)' }}>
          <FiAlertCircle className="text-sm flex-shrink-0" />
          {validationError}
        </div>
      )}

      {/* Result */}
      {lastShortened && shortLink && (
        <div className="mt-5 p-4 rounded-xl border animate-scale-in"
          style={{ background: 'var(--color-accent-50)', borderColor: 'var(--color-accent-200)' }}>
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-accent-700)' }}>
            ✅ Your shortened link is ready!
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-sm font-mono truncate" style={{ color: 'var(--color-primary-600)' }}>
              {shortLink}
            </code>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0 transition-all duration-200"
              style={copied
                ? { background: 'var(--color-accent-200)', color: 'var(--color-accent-800)' }
                : { background: 'var(--color-primary-500)', color: 'white' }
              }
            >
              {copied ? <FiCheck className="text-xs" /> : <FiCopy className="text-xs" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShortenForm
