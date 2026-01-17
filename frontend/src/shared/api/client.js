const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

function toCamelCase(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase)
  }
  const camelObj = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      camelObj[camelKey] = toCamelCase(obj[key])
    }
  }
  return camelObj
}

function toSnakeCase(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase)
  }
  const snakeObj = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      snakeObj[snakeKey] = toSnakeCase(obj[key])
    }
  }
  return snakeObj
}

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(toSnakeCase(options.body))
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)

    if (response.status === 204) {
      return null
    }

    const text = await response.text()
    let data
    try {
      data = text ? JSON.parse(text) : null
    } catch (e) {
      data = text
    }

    const transformedData = toCamelCase(data)

    if (!response.ok) {
      const error = new Error(data?.detail || data?.message || `HTTP error! status: ${response.status}`)
      error.status = response.status
      error.data = transformedData
      throw error
    }

    return transformedData
  } catch (error) {
    if (error.name === 'TypeError') {
      const isNetworkError = 
        error.message.includes('fetch') || 
        error.message.includes('Failed to fetch') || 
        error.message.includes('NetworkError') ||
        error.message.includes('Network request failed') ||
        error.message.includes('ERR_CONNECTION_REFUSED') ||
        error.message.includes('ERR_NETWORK')
      
      if (isNetworkError) {
        throw new Error(`Impossible de se connecter au serveur (${url}). Vérifiez que le backend est démarré et accessible.`)
      }
      throw new Error(`Erreur lors de la requête: ${error.message}`)
    }
    throw error
  }
}

export async function get(endpoint, options = {}) {
  return apiRequest(endpoint, { ...options, method: 'GET' })
}

export async function post(endpoint, data, options = {}) {
  return apiRequest(endpoint, {
    ...options,
    method: 'POST',
    body: data,
  })
}

export async function put(endpoint, data, options = {}) {
  return apiRequest(endpoint, {
    ...options,
    method: 'PUT',
    body: data,
  })
}

export async function patch(endpoint, data, options = {}) {
  return apiRequest(endpoint, {
    ...options,
    method: 'PATCH',
    body: data,
  })
}

export async function del(endpoint, options = {}) {
  return apiRequest(endpoint, { ...options, method: 'DELETE' })
}

export default {
  get,
  post,
  put,
  patch,
  delete: del,
}

