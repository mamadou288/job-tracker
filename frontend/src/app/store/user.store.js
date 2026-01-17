import { defineStore } from 'pinia'
import * as userService from '../../features/user/services/user.service'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: {
      id: null,
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      dateJoined: null,
    },
    loading: false,
    error: null,
    lastUpdated: null,
  }),

  getters: {
    id: (state) => state.profile.id,
    username: (state) => state.profile.username,
    email: (state) => state.profile.email,
    firstName: (state) => state.profile.firstName,
    lastName: (state) => state.profile.lastName,
    name: (state) => {
      if (state.profile.firstName || state.profile.lastName) {
        return `${state.profile.firstName || ''} ${state.profile.lastName || ''}`.trim()
      }
      return state.profile.username || 'User'
    },
    fullProfile: (state) => state.profile,
  },

  actions: {
    /**
     * Charge le profil utilisateur depuis l'API
     * @param {number} id - L'ID de l'utilisateur (par défaut: 1 pour le MVP)
     */
    async fetchProfile(id = 1) {
      this.loading = true
      this.error = null
      try {
        const data = await userService.getProfile(id)
        this.profile = data
        this.lastUpdated = new Date().toISOString()
      } catch (error) {
        console.error('Error fetching profile:', error)
        this.error = error.message || 'Erreur lors du chargement du profil'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Met à jour le profil utilisateur via l'API
     * @param {Object} profileData - Les données à mettre à jour
     */
    async updateProfile(profileData) {
      if (!this.profile.id) {
        throw new Error('Aucun profil chargé')
      }

      this.loading = true
      this.error = null
      try {
        const updatedProfile = await userService.updateProfile(this.profile.id, profileData)
        this.profile = {
          ...this.profile,
          ...updatedProfile,
        }
        this.lastUpdated = new Date().toISOString()
        return updatedProfile
      } catch (error) {
        console.error('Error updating profile:', error)
        this.error = error.message || 'Erreur lors de la mise à jour du profil'
        throw error
      } finally {
        this.loading = false
      }
    },

    resetProfile() {
      this.profile = {
        id: null,
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        dateJoined: null,
      }
      this.lastUpdated = null
      this.error = null
    },
  },
})

