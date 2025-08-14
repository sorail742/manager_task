url : https://manager-task-1-v8y4.onrender.com
#### Exemple d'inscription publique
```http
POST /api/auth/register
Content-Type: application/json

{
   "name": "Sory Keita",
   "email": "sory@example.com",
   "password": "motdepasse"
}
```
La réponse contient le token JWT à utiliser pour les requêtes authentifiées.
#### Exemple de création d'un admin (admin seulement)
```http
POST /api/auth/admin
Content-Type: application/json
Authorization: Bearer <token admin>

{
   "name": "Admin 2",
   "email": "admin2@example.com",
   "password": "motdepasse"
}
```
# Task Manager API

## Présentation
Ce projet est une API RESTful pour la gestion de tâches et d'utilisateurs, développée avec Node.js, Express et MongoDB. Elle permet l'authentification, la gestion des rôles (admin/membre), la création et la gestion de tâches, ainsi que l'ajout de membres liés à un utilisateur.

## Fonctionnalités principales
- **Authentification JWT** (connexion sécurisée)
- **Gestion des utilisateurs** (admin et membres)
- **Gestion des tâches** (CRUD)
- **Validation des données** (Joi)
- **Sécurité** (hash des mots de passe, vérification des rôles)
- **Gestion des erreurs centralisée**

## Structure du projet
```
config/db.js           # Connexion à MongoDB
controllers/           # Logique métier (auth, tâches)
models/                # Schémas Mongoose (User, Task)
middleware/            # Middlewares (auth, validation, erreurs, autorisation)
routes/                # Définition des routes API
validations/           # Schémas de validation Joi
server.js              # Point d'entrée principal
```

## Installation
1. **Cloner le projet**
   ```bash
   git clone <url-du-repo>
   cd task-manager
   ```
2. **Installer les dépendances**
   ```bash
   npm install
   ```
3. **Configurer les variables d'environnement**
   Créer un fichier `.env` à la racine avec :
   ```env
   MONGO_URI=<votre-url-mongodb>
   JWT_SECRET=<votre-secret-jwt>
   PORT=5002
   ```

## Démarrage local
```bash
npm start
```
Le serveur démarre sur le port défini dans `.env` (par défaut 5002).


## Modèles et exemples d'utilisation

### Modèle Utilisateur (User)
```json
{
   "name": "Sory Keita",
   "email": "sory@example.com",
   "password": "motdepasse",
   "role": "member" // ou "admin"
}
```

#### Exemple d'inscription d'un membre
```http
POST /api/auth/members
Content-Type: application/json
Authorization: Bearer <token>

{
   "name": "Membre 1",
   "email": "membre1@example.com",
   "password": "motdepasse"
}
```

#### Exemple de connexion (à implémenter)
```http
POST /api/auth/login
Content-Type: application/json

{
   "email": "sory@example.com",
   "password": "motdepasse"
}
```

### Modèle Tâche (Task)
```json
{
   "title": "Faire le rapport",
   "description": "Rédiger le rapport final du projet",
   "priority": "high", // low, medium, high
   "status": "pending", // pending, in-progress, done
   "dueDate": "2025-08-20"
}
```

#### Exemple de création de tâche
```http
POST /api/tasks
Content-Type: application/json
Authorization: Bearer <token>

{
   "title": "Faire le rapport",
   "description": "Rédiger le rapport final du projet",
   "priority": "high",
   "status": "pending",
   "dueDate": "2025-08-20"
}
```

#### Exemple de récupération des tâches
```http
GET /api/tasks
Authorization: Bearer <token>
```

#### Exemple de modification d'une tâche
```http
PUT /api/tasks/ID_TACHE
Content-Type: application/json
Authorization: Bearer <token>

{
   "status": "done"
}
```

#### Exemple de suppression d'une tâche
```http
DELETE /api/tasks/ID_TACHE
Authorization: Bearer <token>
```

## Sécurité
- Authentification par JWT (header `Authorization: Bearer <token>`)
- Vérification des rôles pour les routes sensibles
- Validation des données en entrée

## Déploiement
Le projet est compatible avec Render, Heroku, etc. Il suffit de renseigner les variables d'environnement sur la plateforme.

## Auteur
Sory KEITA
Université de Labé

## Licence
ISC

---
N'hésitez pas à me contacter pour toute question ou amélioration.
