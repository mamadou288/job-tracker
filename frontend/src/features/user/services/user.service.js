/**
 * Service pour gérer les appels API liés au profil utilisateur
 */

import apiClient from '../../../shared/api/client'

/**
 * Récupère le profil de l'utilisateur depuis l'API
 * @param {number} id - L'ID de l'utilisateur
 * @returns {Promise<Object>} Les données du profil utilisateur
 */
export async function getProfile(id) {
  return apiClient.get(`/api/users/${id}/`)
}

/**
 * Met à jour le profil de l'utilisateur via l'API
 * @param {number} id - L'ID de l'utilisateur
 * @param {Object} profileData - Les données du profil à mettre à jour
 * @returns {Promise<Object>} Le profil mis à jour
 */
export async function updateProfile(id, profileData) {
  return apiClient.patch(`/api/users/${id}/`, profileData)
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

