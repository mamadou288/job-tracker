/**
 * KPI Data Types and Interfaces
 * 
 * This file documents the expected KPI data structure for backend integration.
 * When the backend is implemented, it should return data matching this structure.
 */

/**
 * @typedef {Object} RecentActivity
 * @property {number} thisWeek - Number of applications created in the last 7 days
 * @property {number} thisMonth - Number of applications created in the last 30 days
 */

/**
 * @typedef {Object} StatusDistribution
 * @property {number} todo - Count of applications with 'todo' status
 * @property {number} applied - Count of applications with 'applied' status
 * @property {number} interview - Count of applications with 'interview' status
 * @property {number} offer - Count of applications with 'offer' status
 * @property {number} rejected - Count of applications with 'rejected' status
 */

/**
 * @typedef {Object} KPIMetrics
 * @property {number} totalApplications - Total number of applications
 * @property {StatusDistribution} statusDistribution - Distribution of applications by status
 * @property {number} responseRate - Percentage of applications that received a response (applied + rejected) / total * 100
 * @property {number} conversionRate - Percentage of interviews that converted to offers (offers / interviews) * 100
 * @property {RecentActivity} recentActivity - Recent activity counts
 * @property {number} successRate - Overall success rate (offers / total) * 100
 */

/**
 * Expected API Response Structure
 * 
 * GET /api/kpi/metrics
 * 
 * Response:
 * {
 *   "totalApplications": 10,
 *   "statusDistribution": {
 *     "todo": 2,
 *     "applied": 3,
 *     "interview": 2,
 *     "offer": 1,
 *     "rejected": 2
 *   },
 *   "responseRate": 50,
 *   "conversionRate": 50,
 *   "recentActivity": {
 *     "thisWeek": 3,
 *     "thisMonth": 7
 *   },
 *   "successRate": 10
 * }
 */

export const KPI_METRICS_STRUCTURE = {
  totalApplications: 0,
  statusDistribution: {
    todo: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  },
  responseRate: 0,
  conversionRate: 0,
  recentActivity: {
    thisWeek: 0,
    thisMonth: 0,
  },
  successRate: 0,
}

