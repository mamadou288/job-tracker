import { defineStore } from 'pinia'

export const useApplicationsStore = defineStore('applications', {
  state: () => ({
    applications: [
      {
        id: 1,
        company: 'BNP Paribas',
        title: 'Backend Django Developer',
        status: 'applied',
      },
      {
        id: 2,
        company: 'Doctolib',
        title: 'Frontend Vue Developer',
        status: 'interview',
      },
      {
        id: 3,
        company: 'Google',
        title: 'Software Engineer',
        status: 'todo',
      },
    ],
  }),

  getters: {
    applicationsByStatus: (state) => {
      return (status) =>
        state.applications.filter((a) => a.status === status)
    },
  },
})
