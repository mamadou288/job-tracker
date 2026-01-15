## 1. La phrase produit
Ex Job Tracker :

- créer une candidature
- la voir dans un pipeline
- la modifier/supprimer
- la déplacer de statut


## 2. Les règles métier 

- company + title obligatoires
- status choices = {todo, applied, interview, offer, rejected}
- updatedAt se met à jour à chaque modification


## 3. Le modèle de données (le JSON)

Ex :

{
  "id": "a1",
  "company": "BNP",
  "title": "Backend Django",
  "status": "applied",
  "createdAt": "2026-01-13T10:00:00Z",
  "updatedAt": "2026-01-13T10:00:00Z"
}

## 4. Les écrans + parcours utilisateur

Board : voir / créer / déplacer / ouvrir / supprimer


## 5. L’architecture (qui fait quoi)

Composants (UI)

Store (state + logique)

Services (persistance / API)


## 6. Plan MVP → V1

V1 : filtres, stats, timeline

______________________________________________________________________________________
_______________________________________________________________________________________

## A. Phrase produit (MVP)

À la fin, l’utilisateur peut :

ajouter une candidature (entreprise, poste)

la voir dans un pipeline par statut

modifier/supprimer une candidature

changer son statut


## B. Règles

champs obligatoires : company, title

statut par défaut : todo

dates auto : createdAt, updatedAt


## C. Pages

1 seule page MVP : Board