# Music-forum Project
---
**A Spotify-integrated & server-side rendered web application**

---
## Features
#### Role-Based Functionality

  **Unauthorized Visitor**
  - Search artists, albums and tracks via Spotify API
  - View all the songs or by genre
  - View the latest songs and the latest comments

  **Authorized User (log-in user)**
  - Add a song to favorite list (like a song)
  - Leave the comments

  **Admin**
  - Create, delete, edit songs and upload images
  - Create, delete, edit genres
  - Create, delete, edit comments
  - Set general user as admin

#### Advanced Authentication
- Local authentication
- Google OAuth integration for sign-up/login
---

## Technology Stack
- **Frontend**: Server-Side Rendering (SSR)
- **Backend**: Node.js (Express.js framework)
- **Database**: MySQL
- **Authentication**: Local strategy & Google OAuth
- **API Integration**: Spotify API
- **Containerization**: Docker for easy deployment

---
## Deployment :
#### With Docker
- docker pull
- docker-compose up --build
- Access the app at 
```
http://localhost:3000
```

#### Locally
- git clone
- npm install
- npm start/npm run dev
- Access the app at 
```
http://localhost:3000
```

#### Test Account
accounts for easy testing:
- Admin: root@example.com / 12345678
- General User: user1@example.com / 12345678
