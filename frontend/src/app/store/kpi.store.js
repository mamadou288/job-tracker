import { defineStore } from 'pinia'
import { useApplicationsStore } from './applications.store'

export const useKPIStore = defineStore('kpi', {
  state: () => ({
    metrics: {
      totalApplications: 0,
      statusDistribution: {},
      responseRate: 0,
      conversionRate: 0,
      recentActivity: {
        thisWeek: 0,
        thisMonth: 0,
      },
      successRate: 0,
    },
    loading: false,
    lastUpdated: null,
  }),

  getters: {
    totalApplications: (state) => state.metrics.totalApplications,
    statusDistribution: (state) => state.metrics.statusDistribution,
    responseRate: (state) => state.metrics.responseRate,
    conversionRate: (state) => state.metrics.conversionRate,
    recentActivity: (state) => state.metrics.recentActivity,
    successRate: (state) => state.metrics.successRate,
  },

  actions: {
    calculateKPIs() {
      const applicationsStore = useApplicationsStore()
      const applications = applicationsStore.applications

      // Total applications
      const total = applications.length

      // Status distribution
      const statusDist = {}
      const statusKeys = ['todo', 'applied', 'interview', 'offer', 'rejected']
      statusKeys.forEach(status => {
        statusDist[status] = applications.filter(app => app.status === status).length
      })

      // Response rate: (applied + rejected) / total * 100
      const responded = statusDist.applied + statusDist.rejected
      const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0

      // Conversion rate: (offers / interviews) * 100
      const conversionRate = statusDist.interview > 0 
        ? Math.round((statusDist.offer / statusDist.interview) * 100) 
        : 0

      // Success rate: (offers / total) * 100
      const successRate = total > 0 
        ? Math.round((statusDist.offer / total) * 100) 
        : 0

      // Recent activity
      const now = new Date()
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

      const thisWeek = applications.filter(app => {
        const createdAt = new Date(app.createdAt)
        return createdAt >= weekAgo
      }).length

      const thisMonth = applications.filter(app => {
        const createdAt = new Date(app.createdAt)
        return createdAt >= monthAgo
      }).length

      // Update metrics
      this.metrics = {
        totalApplications: total,
        statusDistribution: statusDist,
        responseRate,
        conversionRate,
        recentActivity: {
          thisWeek,
          thisMonth,
        },
        successRate,
      }

      this.lastUpdated = new Date().toISOString()
    },

    // Placeholder for future backend API call
    async fetchKPIs() {
      this.loading = true
      try {
        // TODO: Replace with actual API call
        // const response = await kpiService.getKPIMetrics()
        // this.metrics = response.data
        
        // For now, calculate from local store
        this.calculateKPIs()
      } catch (error) {
        console.error('Error fetching KPIs:', error)
      } finally {
        this.loading = false
      }
    },

    refreshKPIs() {
      this.calculateKPIs()
    },
  },
})

