import apiClient from '../../../shared/api/client'

export async function getApplications() {
  return apiClient.get('/api/applications/')
}

export async function getApplication(id) {
  return apiClient.get(`/api/applications/${id}/`)
}

export async function createApplication(data) {
  return apiClient.post('/api/applications/', data)
}

export async function updateApplication(id, data) {
  return apiClient.patch(`/api/applications/${id}/`, data)
}

export async function deleteApplication(id) {
  return apiClient.delete(`/api/applications/${id}/`)
}

