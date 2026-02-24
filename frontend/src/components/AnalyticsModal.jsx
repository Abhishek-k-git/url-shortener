import { useEffect, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiX, FiBarChart2 } from 'react-icons/fi'
import { clearUrlAnalytics, selectUrlAnalytics, selectUrlAnalyticsLoading } from '../store/analyticsSlice'
import UrlBarChart from './charts/UrlBarChart'

const AnalyticsModal = forwardRef(function AnalyticsModal({ shortUrl, onClose }, ref) {
  const dispatch = useDispatch()
  const analytics = useSelector(selectUrlAnalytics)
  const loading = useSelector(selectUrlAnalyticsLoading)

  const handleClose = () => {
    dispatch(clearUrlAnalytics())
    if (ref?.current) ref.current.close()
    if (onClose) onClose()
  }

  // Close on escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <dialog ref={ref} className="modal" onClose={handleClose}>
      <div className="modal-box max-w-2xl p-0 overflow-hidden rounded-2xl shadow-2xl border border-neutral-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100"
          style={{ background: 'linear-gradient(135deg, var(--color-primary-50), var(--color-secondary-50))' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))' }}>
              <FiBarChart2 className="text-white text-sm" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800" style={{ fontFamily: 'var(--font-display)' }}>
                URL Analytics
              </h3>
              {shortUrl && (
                <p className="text-xs text-neutral-500 font-mono">
                  {window.location.host}/{shortUrl}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            <FiX />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin"
                  style={{ borderColor: 'var(--color-primary-200)', borderTopColor: 'var(--color-primary-500)' }} />
                <p className="text-sm text-neutral-500">Loading analytics...</p>
              </div>
            </div>
          ) : analytics?.data && analytics.data.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl" style={{ background: 'var(--color-primary-50)' }}>
                  <p className="text-xs text-neutral-500 mb-1">Total Clicks</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-primary-600)', fontFamily: 'var(--font-display)' }}>
                    {analytics.data.reduce((a, b) => a + Number(b.count || 0), 0)}
                  </p>
                </div>
                <div className="p-4 rounded-xl" style={{ background: 'var(--color-accent-50)' }}>
                  <p className="text-xs text-neutral-500 mb-1">Days Tracked</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-accent-600)', fontFamily: 'var(--font-display)' }}>
                    {analytics.data.length}
                  </p>
                </div>
              </div>
              <UrlBarChart data={analytics.data} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'var(--color-neutral-100)' }}>
                <FiBarChart2 className="text-2xl text-neutral-400" />
              </div>
              <p className="text-neutral-600 font-medium mb-1">No analytics data</p>
              <p className="text-sm text-neutral-400">Sorry! This feature is not available</p>
            </div>
          )}
        </div>
      </div>
      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  )
})

export default AnalyticsModal
