/**
 * Service pour gérer les appels API liés au profil utilisateur
 * 
 * Ce service est un placeholder pour la future intégration backend.
 * Pour l'instant, il retourne des données mock.
 */

/**
 * Récupère le profil de l'utilisateur depuis l'API
 * @returns {Promise<Object>} Les données du profil utilisateur
 */
export async function getProfile() {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/user/profile')
  // return response.json()
  
  // Mock data for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
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
      })
    }, 500) // Simulate network delay
  })
}

/**
 * Met à jour le profil de l'utilisateur via l'API
 * @param {Object} profileData - Les données du profil à mettre à jour
 * @returns {Promise<Object>} Le profil mis à jour
 */
export async function updateProfile(profileData) {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/user/profile', {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(profileData),
  // })
  // return response.json()
  
  // Mock update for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...profileData,
        updatedAt: new Date().toISOString(),
      })
    }, 500) // Simulate network delay
  })
}

/**
 * Upload une photo de profil
 * @param {File} file - Le fichier image à uploader
 * @returns {Promise<string>} L'URL de la photo uploadée
 */
export async function uploadAvatar(file) {
  // TODO: Replace with actual API call
  // const formData = new FormData()
  // formData.append('avatar', file)
  // const response = await fetch('/api/user/avatar', {
  //   method: 'POST',
  //   body: formData,
  // })
  // const data = await response.json()
  // return data.url
  
  // Mock upload for now - return a data URL
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

