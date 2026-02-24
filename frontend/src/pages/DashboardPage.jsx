import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUrls, selectUrls, selectUrlsLoading } from '../store/urlSlice'
import { fetchTotalClicks, fetchUrlAnalytics, selectClicksData, selectAnalyticsLoading, clearUrlAnalytics } from '../store/analyticsSlice'
import { selectCurrentUser } from '../store/authSlice'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ShortenForm from '../components/ShortenForm'
import UrlCard from '../components/UrlCard'
import ClicksLineChart from '../components/charts/ClicksLineChart'
import AnalyticsModal from '../components/AnalyticsModal'
import { FiLink2, FiMousePointer, FiTrendingUp, FiCalendar, FiRefreshCw, FiSearch } from 'react-icons/fi'

// Helper: format date as YYYY-MM-DD
const toDateStr = (d) => d.toISOString().split('T')[0]

const DashboardPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const urls = useSelector(selectUrls)
  const urlsLoading = useSelector(selectUrlsLoading)
  const clicksData = useSelector(selectClicksData)
  const analyticsLoading = useSelector(selectAnalyticsLoading)

  const dialogRef = useRef(null)
  const [selectedShortUrl, setSelectedShortUrl] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Date range — default last 30 days
  const [startDate, setStartDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() - 29); return toDateStr(d)
  })
  const [endDate, setEndDate] = useState(() => toDateStr(new Date()))

  useEffect(() => {
    dispatch(fetchAllUrls())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchTotalClicks({ startDate, endDate }))
  }, [dispatch, startDate, endDate])

  const totalClicks = Object.values(clicksData || {}).reduce((a, b) => a + Number(b), 0)
  const totalUrls = urls.length
  const avgClicks = totalUrls > 0 ? (totalClicks / totalUrls).toFixed(1) : 0

  const filteredUrls = urls.filter((u) => {
    const q = searchQuery.toLowerCase()
    return !q || u.originalUrl?.toLowerCase().includes(q) || u.shortUrl?.toLowerCase().includes(q)
  })

  const handleAnalyticsClick = (shortUrl) => {
    setSelectedShortUrl(shortUrl)
    const now = new Date()
    const from = new Date(); from.setDate(now.getDate() - 29)
    dispatch(fetchUrlAnalytics({
      shortUrl,
      startDate: from.toISOString(),
      endDate: now.toISOString(),
    }))
    if (dialogRef.current) dialogRef.current.showModal()
  }

  const handleModalClose = () => {
    dispatch(clearUrlAnalytics())
    setSelectedShortUrl(null)
  }

  const STAT_CARDS = [
    {
      label: 'Total Links',
      value: totalUrls,
      icon: <FiLink2 />,
      color: 'primary',
      sub: 'All-time',
    },
    {
      label: 'Total Clicks',
      value: totalClicks,
      icon: <FiMousePointer />,
      color: 'secondary',
      sub: `${startDate} — ${endDate}`,
    },
    {
      label: 'Avg. Clicks / Link',
      value: avgClicks,
      icon: <FiTrendingUp />,
      color: 'accent',
      sub: 'Over selected period',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-surface-muted)' }}>
      <Navbar />

      <main className="flex-1 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* ── Page header ─────────────────────────────────── */}
          <div className="pt-8 pb-6 animate-fade-down">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-neutral-800"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋
                </h1>
                <p className="text-sm text-neutral-500 mt-1">Here's what's happening with your links.</p>
              </div>
            </div>
          </div>

          {/* ── Stats row ───────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {STAT_CARDS.map(({ label, value, icon, color, sub }, i) => (
              <div key={label}
                className={`card-base p-5 animate-fade-up delay-${(i + 1) * 100}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-neutral-500">{label}</p>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                    style={{
                      background: color === 'primary'
                        ? 'var(--color-primary-100)'
                        : color === 'secondary'
                        ? 'var(--color-secondary-100)'
                        : 'var(--color-accent-100)',
                      color: color === 'primary'
                        ? 'var(--color-primary-600)'
                        : color === 'secondary'
                        ? 'var(--color-secondary-600)'
                        : 'var(--color-accent-600)',
                    }}>
                    {icon}
                  </div>
                </div>
                <p className="text-3xl font-bold text-neutral-800 mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  {value}
                </p>
                <p className="text-xs text-neutral-400 truncate">{sub}</p>
              </div>
            ))}
          </div>

          {/* ── Shorten form ────────────────────────────────── */}
          <div className="mb-6">
            <ShortenForm />
          </div>

          {/* ── Analytics chart ─────────────────────────────── */}
          <div className="card-base p-6 mb-6 animate-fade-up delay-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-base font-semibold text-neutral-800"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  Clicks Over Time
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">Total clicks across all your links</p>
              </div>
              {/* Date range */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-600">
                  <FiCalendar className="text-neutral-400 text-xs" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-transparent text-xs border-none outline-none cursor-pointer"
                    max={endDate}
                  />
                </div>
                <span className="text-neutral-400 text-xs">to</span>
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-600">
                  <FiCalendar className="text-neutral-400 text-xs" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-transparent text-xs border-none outline-none cursor-pointer"
                    min={startDate}
                    max={toDateStr(new Date())}
                  />
                </div>
                <button
                  onClick={() => dispatch(fetchTotalClicks({ startDate, endDate }))}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors"
                  style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary-700)' }}
                  disabled={analyticsLoading}
                >
                  <FiRefreshCw className={`text-xs ${analyticsLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>
            <div className="h-64">
              {analyticsLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
                </div>
              ) : (
                <ClicksLineChart clicksData={clicksData} />
              )}
            </div>
          </div>

          {/* ── URL List ────────────────────────────────────── */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h2 className="text-base font-semibold text-neutral-800"
                style={{ fontFamily: 'var(--font-display)' }}>
                Your Links{' '}
                <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
                  {urls.length}
                </span>
              </h2>
              {/* Search */}
              <div className="relative max-w-xs w-full">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-xs" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search links..."
                  className="w-full pl-8 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 bg-white placeholder-neutral-400 focus:border-primary-400"
                />
              </div>
            </div>

            {urlsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="card-base p-5 animate-pulse">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-neutral-100" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2.5 bg-neutral-100 rounded-full w-3/4" />
                        <div className="h-2 bg-neutral-100 rounded-full w-1/2" />
                      </div>
                    </div>
                    <div className="h-10 bg-neutral-100 rounded-xl mb-4" />
                    <div className="flex justify-between">
                      <div className="h-2 bg-neutral-100 rounded w-1/4" />
                      <div className="h-7 bg-neutral-100 rounded-lg w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredUrls.length === 0 ? (
              <div className="card-base p-16 text-center animate-fade-up">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'var(--color-primary-50)' }}>
                  <FiLink2 className="text-2xl" style={{ color: 'var(--color-primary-400)' }} />
                </div>
                <p className="font-semibold text-neutral-700 mb-1">
                  {searchQuery ? 'No links match your search' : 'No links yet'}
                </p>
                <p className="text-sm text-neutral-400">
                  {searchQuery ? 'Try a different search term.' : 'Use the form above to shorten your first URL!'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUrls.map((url) => (
                  <UrlCard
                    key={url.id}
                    url={url}
                    onAnalyticsClick={handleAnalyticsClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Analytics Modal */}
      <AnalyticsModal
        ref={dialogRef}
        shortUrl={selectedShortUrl}
        onClose={handleModalClose}
      />

      <Footer />
    </div>
  )
}

export default DashboardPage
