/**
 * @typedef {Object} UserProfile
 * @property {number} id - Identifiant unique de l'utilisateur
 * @property {string} name - Nom complet de l'utilisateur
 * @property {string} email - Adresse email de l'utilisateur
 * @property {string} [phone] - Numéro de téléphone (optionnel)
 * @property {string} [location] - Localisation de l'utilisateur (optionnel)
 * @property {string} [bio] - Biographie de l'utilisateur (optionnel)
 * @property {string} [avatar] - URL de la photo de profil (optionnel)
 * @property {string} role - Rôle de l'utilisateur (ex: "Job Seeker")
 * @property {string} createdAt - Date de création au format ISO 8601
 * @property {string} updatedAt - Date de mise à jour au format ISO 8601
 */

/**
 * @typedef {Object} UserStoreState
 * @property {UserProfile} profile - Profil utilisateur complet
 * @property {boolean} loading - État de chargement
 * @property {string|null} lastUpdated - Date de dernière mise à jour
 */

// This file serves as documentation for the expected user profile data structure
// It will be used to ensure consistency between frontend display and future backend API.

