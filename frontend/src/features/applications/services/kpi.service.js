/**
 * KPI Service
 * 
 * This service layer is prepared for future backend integration.
 * Currently, it uses the store to calculate KPIs from local data.
 * 
 * When the backend is ready, replace the implementation with actual API calls.
 */

/**
 * Expected API Endpoints:
 * 
 * GET /api/kpi/metrics
 * - Returns all KPI metrics
 * - Response format: See kpi.types.js
 * 
 * GET /api/kpi/status-distribution
 * - Returns status distribution data
 * 
 * GET /api/kpi/activity-timeline
 * - Returns activity timeline data
 */

/**
 * Get all KPI metrics
 * @returns {Promise<Object>} KPI metrics object
 */
export async function getKPIMetrics() {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/kpi/metrics')
  // return response.json()
  
  // For now, return null to use store calculations
  return null
}

/**
 * Get status distribution
 * @returns {Promise<Object>} Status distribution object
 */
export async function getStatusDistribution() {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/kpi/status-distribution')
  // return response.json()
  
  return null
}

/**
 * Get activity timeline data
 * @param {string} period - 'week' | 'month' | 'year'
 * @returns {Promise<Array>} Timeline data array
 */
export async function getActivityTimeline(period = 'month') {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/kpi/activity-timeline?period=${period}`)
  // return response.json()
  
  return null
}

/**
 * Refresh KPI data from backend
 * @returns {Promise<Object>} Updated KPI metrics
 */
export async function refreshKPIs() {
  // TODO: Implement API call to refresh KPIs
  return getKPIMetrics()
}

