import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: {
      id: 1,
      name: 'User',
      email: 'user@example.com',
      phone: '',
      location: '',
      bio: '',
      avatar: '',
      role: 'Job Seeker',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    loading: false,
    lastUpdated: null,
  }),

  getters: {
    id: (state) => state.profile.id,
    name: (state) => state.profile.name,
    email: (state) => state.profile.email,
    phone: (state) => state.profile.phone,
    location: (state) => state.profile.location,
    bio: (state) => state.profile.bio,
    avatar: (state) => state.profile.avatar,
    role: (state) => state.profile.role,
    createdAt: (state) => state.profile.createdAt,
    updatedAt: (state) => state.profile.updatedAt,
    fullProfile: (state) => state.profile,
  },

  actions: {
    updateProfile(profileData) {
      const now = new Date().toISOString()
      this.profile = {
        ...this.profile,
        ...profileData,
        updatedAt: now,
      }
      this.lastUpdated = now
    },

    async fetchProfile() {
      this.loading = true
      try {
        // TODO: Replace with actual API call
        // const response = await userService.getProfile()
        // this.profile = response.data
        
        // For now, use mock data from state
        this.lastUpdated = new Date().toISOString()
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        this.loading = false
      }
    },

    resetProfile() {
      this.profile = {
        id: 1,
        name: 'User',
        email: 'user@example.com',
        phone: '',
        location: '',
        bio: '',
        avatar: '',
        role: 'Job Seeker',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      this.lastUpdated = null
    },
  },
})

