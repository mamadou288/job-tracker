import { defineStore } from 'pinia'
import * as applicationService from '../../features/applications/services/application.service'

export const useApplicationsStore = defineStore('applications', {
  state: () => ({
    applications: [],
    loading: false,
    error: null,
  }),

  getters: {
    applicationsByStatus: (state) => {
      return (status) => {
        if (!Array.isArray(state.applications)) {
          return []
        }
        return state.applications.filter((a) => a.status === status)
      }
    },
  },

  actions: {
    async fetchApplications() {
      this.loading = true
      this.error = null
      try {
        const data = await applicationService.getApplications()
        this.applications = Array.isArray(data) ? data : (data?.results || [])
      } catch (error) {
        console.error('Error fetching applications:', error)
        this.error = error.message || 'Erreur lors du chargement des candidatures'
        throw error
      } finally {
        this.loading = false
      }
    },

    async addApplication({ company, title, status = 'todo' }) {
      const cleanCompany = company.trim()
      const cleanTitle = title.trim()

      if (!cleanCompany || !cleanTitle) {
        throw new Error('Le nom de l\'entreprise et le poste sont requis')
      }

      const validStatuses = ['todo', 'applied', 'interview', 'offer', 'rejected']
      const finalStatus = validStatuses.includes(status) ? status : 'todo'

      this.loading = true
      this.error = null
      try {
        const newApp = await applicationService.createApplication({
          company: cleanCompany,
          title: cleanTitle,
          status: finalStatus,
        })
        this.applications.push(newApp)
        return newApp
      } catch (error) {
        console.error('Error creating application:', error)
        this.error = error.message || 'Erreur lors de la création de la candidature'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateApplicationStatus(applicationId, newStatus) {
      const application = this.applications.find(app => app.id === applicationId)
      if (!application) {
        throw new Error('Candidature introuvable')
      }

      this.error = null
      try {
        const updatedApp = await applicationService.updateApplication(applicationId, {
          status: newStatus,
        })
        
        const index = this.applications.findIndex(app => app.id === applicationId)
        if (index !== -1) {
          this.applications[index] = updatedApp
        }
        
        return updatedApp
      } catch (error) {
        console.error('Error updating application status:', error)
        this.error = error.message || 'Erreur lors de la mise à jour du statut'
        throw error
      }
    },

    async deleteApplication(applicationId) {
      this.error = null
      try {
        await applicationService.deleteApplication(applicationId)
        this.applications = this.applications.filter(app => app.id !== applicationId)
      } catch (error) {
        console.error('Error deleting application:', error)
        this.error = error.message || 'Erreur lors de la suppression de la candidature'
        throw error
      }
    },
  },

})
