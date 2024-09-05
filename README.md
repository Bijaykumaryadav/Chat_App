

# ChatApp

ChatApp is a real-time chat application built with Node.js, Express, MongoDB, React, and Tailwind CSS. It features real-time communication using Socket.io, authentication with Passport, and state management with Redux. The application also supports social logins using Google OAuth and uses various animations for an enhanced user experience.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [License](#license)

## Features
- Real-time messaging using Socket.io
- User authentication with Passport (JWT and Google OAuth)
- Secure password hashing with bcrypt
- API development with Express and MongoDB (Mongoose)
- Responsive design using Tailwind CSS
- Animations with Animate.css and Lottie
- Redux for state management
- Error handling and input validation using Validator
- File uploads with Multer
- Email notifications with Nodemailer
- Classic SignIn/SignUp UI with smooth transitions

## Tech Stack

**Frontend:**
- React
- Tailwind CSS
- Vite
- React-Redux
- Axios
- React Router
- Lottie for animations

**Backend:**
- Node.js
- Express
- MongoDB & Mongoose
- Passport (JWT & Google OAuth)
- Socket.io

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB

### Clone the repository
git clone https://github.com/Bijaykumaryadav/Chat_App.git
cd Chat_App


## Backend Setup

1. Navigate to the backend folder:
    cd backend

2. Install dependencies:
    npm install

3. Create a `.env` file and add your environment variables:
    MONGODB_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    

4. Start the backend server:
    npm start
    

## Frontend Setup

1. Navigate to the frontend folder:
    cd frontend

2. Install dependencies:
    npm install

3. Start the development server:
    npm run dev

## Usage

1. Open `http://localhost:5173` in your browser for the frontend.
2. For backend API, access `http://localhost:8000`.

## License

This project is licensed under the ISC License.

