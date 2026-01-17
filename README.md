# Job Tracker

Application de suivi de candidatures (Job Applications Tracker).

## Stack
- Frontend : Vue 3 + Vite + Pinia
- Backend : Django + Django REST Framework

## Fonctionnalités (MVP)
- Ajouter une candidature
- Suivre les candidatures par statut (pipeline)
- Modifier / supprimer une candidature
- Gérer le profil utilisateur

## Configuration

### Backend

1. Créer et activer l'environnement virtuel :
```bash
cd backend
python -m venv venv
# Sur Windows
venv\Scripts\activate
# Sur Linux/Mac
source venv/bin/activate
```

2. Installer les dépendances :
```bash
pip install -r requirements.txt
```

3. Configurer les variables d'environnement :
```bash
# Créer le fichier .env dans backend/
SECRET_KEY=votre-secret-key-ici
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

4. Créer et appliquer les migrations :
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Créer un superutilisateur (optionnel) :
```bash
python manage.py createsuperuser
```

6. Lancer le serveur de développement :
```bash
python manage.py runserver
```

Le backend sera accessible sur `http://localhost:8000`

### Frontend

1. Installer les dépendances :
```bash
cd frontend
npm install
```

2. Configurer l'URL de l'API (optionnel) :
Créer un fichier `.env` dans `frontend/` avec :
```
VITE_API_BASE_URL=http://localhost:8000
```

Par défaut, le frontend utilise `http://localhost:8000` si la variable n'est pas définie.

3. Lancer le serveur de développement :
```bash
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173`

## API Endpoints

### Applications
- `GET /api/applications/` - Liste toutes les candidatures
- `POST /api/applications/` - Crée une nouvelle candidature
- `GET /api/applications/<id>/` - Récupère une candidature
- `PATCH /api/applications/<id>/` - Met à jour une candidature
- `DELETE /api/applications/<id>/` - Supprime une candidature

### Users
- `GET /api/users/<id>/` - Récupère un utilisateur
- `PATCH /api/users/<id>/` - Met à jour un utilisateur

## Notes

- Le backend utilise CORS pour autoriser les requêtes depuis `http://localhost:5173`
- Les données sont automatiquement transformées entre snake_case (backend) et camelCase (frontend)
- Pour tester les endpoints users, vous devrez créer un utilisateur via l'admin Django ou modifier temporairement les permissions dans `backend/users/views/UserViews.py`

