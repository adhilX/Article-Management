# 📝 Article Management System

A modern, full-stack Article Management System built with a focus on speed, security, and a premium user experience. This project features a robust TypeScript backend and a dynamic Next.js frontend, enabling users to create, manage, and share articles effortlessly.

---

## 🚀 Key Features

- **🔐 Secure Authentication**: 
  - JWT-based authentication with Access and Refresh tokens.
  - Secure HTTP-only cookies for token storage.
  - User signup and login with hashed passwords (Bcrypt).
- **📰 Article Management (CRUD)**:
  - Create, read, update, and delete articles.
  - Support for categorized tags and dynamic content.
  - Rich metadata (author, timestamps, reading time).
- **🎨 Premium UI/UX**:
  - Built with **Tailwind CSS 4** for a sleek, modern look.
  - Smooth animations powered by **Framer Motion**.
  - Responsive design for mobile, tablet, and desktop views.
- **⚡ Advanced State Management**:
  - Global state handling with **Redux Toolkit**.
  - Persistent user sessions using **Redux Persist**.
- **🛠 Modern Tech Stack**:
  - **Frontend**: Next.js 16 (App Router), React 19, Lucide Icons.
  - **Backend**: Express 5, Node.js, TypeScript 6.
  - **Database**: MongoDB with Mongoose ODM.
  - **Validation**: Schema-based validation using **Zod**.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **Language**: [TypeScript 6](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Auth**: [JSON Web Tokens (JWT)](https://jwt.io/) & [BcryptJS](https://github.com/dcodeIO/bcrypt.js)
- **Validation**: [Zod](https://zod.dev/)

---

## 📂 Project Structure

```text
Article-Management/
├── frontend/               # Next.js Application
│   ├── app/                # App Router (pages & layouts)
│   ├── components/         # Reusable UI components
│   ├── store/              # Redux logic (slices & store)
│   ├── services/           # API interaction layer
│   └── public/             # Static assets
└── backend/                # Express Server
    ├── src/
    │   ├── controllers/    # Request handlers
    │   ├── routes/         # API endpoints
    │   ├── models/         # Mongoose schemas
    │   ├── middleware/     # Auth & error handling
    │   └── config/         # Database & environment config
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/adhilX/Article-Management.git
   cd Article-Management
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` folder:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_secret_key
     ACCESS_TOKEN_SECRET=your_access_secret
     REFRESH_TOKEN_SECRET=your_refresh_secret
     FRONTEND_URL=http://localhost:3000
     ```
   - Start the server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```
   - Create a `.env.local` file in the `frontend` folder:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:5000/api
     ```
   - Start the application:
     ```bash
     npm run dev
     ```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and receive tokens
- `POST /api/auth/refresh` - Refresh the access token

### Articles
- `GET /api/articles` - Fetch all articles
- `GET /api/articles/:id` - Get a specific article
- `POST /api/articles` - Create a new article (Protected)
- `PUT /api/articles/:id` - Update an article (Protected)
- `DELETE /api/articles/:id` - Remove an article (Protected)
- `GET /api/articles/tags` - Get all unique tags (Protected)

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).
