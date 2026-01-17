import { defineStore } from 'pinia'

export const useApplicationsStore = defineStore('applications', {
  state: () => ({
    applications: [
            {
                id: 1,
                company: 'BNP Paribas',
                title: 'Backend Django Developer',
                status: 'applied',
                createdAt: '2026-01-13T10:00:00Z',
                updatedAt: '2026-01-13T10:00:00Z',
            },
            {
                id: 2,
                company: 'Doctolib',
                title: 'Frontend Vue Developer',
                status: 'interview',
                createdAt: '2026-01-13T10:00:00Z',
                updatedAt: '2026-01-13T10:00:00Z',
            },
            {
                id: 3,
                company: 'Google',
                title: 'Software Engineer',
                status: 'todo',
                createdAt: '2026-01-13T10:00:00Z',
                updatedAt: '2026-01-13T10:00:00Z',
            },
        ]
    }),

    getters: {
        applicationsByStatus: (state) => {
            return (status) =>
                state.applications.filter((a) => a.status === status)
        },
    },

    actions: {
        addApplication({ company, title }) {
            const cleanCompany = company.trim()
            const cleanTitle = title.trim()

            if (!cleanCompany || !cleanTitle) return

            const now = new Date().toISOString()
            const newApp = {
                id: Date.now(),
                company,
                title,
                status: 'todo',
                createdAt: now,
                updatedAt: now,
            }

            this.applications.push(newApp)
        },

        updateApplicationStatus(applicationId, newStatus) {
            const application = this.applications.find(app => app.id === applicationId)
            if (application) {
                application.status = newStatus
                application.updatedAt = new Date().toISOString()
            }
        },
    },

})
