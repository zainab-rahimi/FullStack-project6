# MDD — Monde de Dév

A full-stack social network platform for developers. Users can register, follow topics, read and write articles, and leave comments — all behind a JWT-secured API.

---

## Tech Stack

### Frontend
| Technology | Version |
|---|---|
| Angular | 20.x |
| Angular Material | 20.x |
| Angular SSR | 20.x |
| RxJS | 7.8.x |
| TypeScript | 5.9.x |

### Backend
| Technology | Version |
|---|---|
| Java | 17 |
| Spring Boot | 4.0.3 |
| Spring Security | (via Spring Boot) |
| Spring Data JPA | (via Spring Boot) |
| MySQL | 8.x |
| JJWT | latest |
| Lombok | latest |

---

## Project Structure

```
project 6/
├── frontend6/
│   └── mdd-frontend/       # Angular application
│       ├── src/
│       │   └── app/
│       │       ├── core/           # Guards, interceptors, services
│       │       ├── features/       # Feature modules (auth, articles, topics, user)
│       │       └── shared/         # Shared components and models
│       └── package.json
└── backend6/               # Spring Boot application
    ├── src/main/java/com/openclassrooms/backend6/
    │   ├── config/         # Security & application config
    │   ├── controller/     # REST controllers
    │   ├── dto/            # Request/response DTOs
    │   ├── entity/         # JPA entities
    │   ├── repository/     # Spring Data repositories
    │   ├── security/       # JWT service & filter
    │   └── service/        # Business logic
    └── pom.xml
```

---

## Features

- **Authentication** — Register and login with JWT-based session management
- **Articles** — Browse a personalized feed, create articles, view article details
- **Comments** — Add comments to articles
- **Topics** — Browse all topics and subscribe/unsubscribe
- **Profile** — View and update user profile information
- **Route Guards** — Protected routes accessible only to authenticated users

---

## Prerequisites

- Node.js ≥ 18 and npm
- Angular CLI (`npm install -g @angular/cli`)
- Java 17
- Maven
- MySQL 8.x

---

## Database Setup

1. Create the database:
   ```sql
   CREATE DATABASE MDD;
   ```

2. The default credentials used by the backend are:
   - **Host**: `localhost:3306`
   - **Database**: `MDD`
   - **Username**: `root`
   - **Password**: `123`

   Update `backend6/src/main/resources/application.properties` if your credentials differ.

---

## Running the Backend

```bash
cd backend6
./mvnw spring-boot:run
```

The API will start on **http://localhost:8080**.

You can override the JWT secret and expiration at runtime:

```bash
JWT_SECRET=your_secret JWT_EXPIRATION=86400000 ./mvnw spring-boot:run
```

---

## Running the Frontend

```bash
cd frontend6/mdd-frontend
npm install
ng serve
```

The app will be available at **http://localhost:4200**.

### Build for production

```bash
ng build
```


---

## API Endpoints

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive a JWT | No |
| GET | `/api/articles` | Get article feed | Yes |
| POST | `/api/articles` | Create an article | Yes |
| GET | `/api/articles/{id}` | Get article details | Yes |
| POST | `/api/articles/{id}/comments` | Add a comment | Yes |
| GET | `/api/topics` | List all topics | Yes |
| POST | `/api/topics/{id}/subscribe` | Subscribe to a topic | Yes |
| DELETE | `/api/topics/{id}/subscribe` | Unsubscribe from a topic | Yes |
| GET | `/api/users/me` | Get current user profile | Yes |
| PUT | `/api/users/me` | Update current user profile | Yes |

---

