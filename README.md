# Doctor Consultation Appointment Booking System

#### Frontend: React, Redux, TailwindCSS

#### Backend: Node.js, Express.js

#### Database: MongoDB, Firestore

#### Other Tools: npm, Git (version control), Remixicons for icons, Stripe for payment integration, cron for job scheduling, nodemailer for email service, vite for dev environment


## Getting Started

### 1. Cloning the Repository

```bash
git clone https://github.com/coder-zs-cse/MERN-Stack-Backend-Learning-Project-.git
cd MERN-Stack-Backend-Learning-Project-
```

#### We would require two terminals. One for frontend and one for backend.

### 2. Setting up the Backend


Rename the .env-sample file to .env:

Open the .env file and replace the placeholder values:
```bash
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET_KEY=your_jwt_secret_key_here
..etc
```
Install the dependencies:
```bash
cd backend
npm install
```

### 3. Start the backend server:
```bash
nodemon server
```
The server should now be running on http://localhost:5000.

### 4. Setting up the Frontend
In a second terminal, navigate to the client directory:
```bash
cd client
```

Install the dependencies:
```bash
npm install
```

### 5. Start the frontend development server:
```bash
npm start
```
The frontend should now be running on http://localhost:5173.

### Cool, now open your web browser and navigate to `http://localhost:5173` to access the application.

Let us look up the UI of our application.

## Landing Page + Customer Support
- Landing page with customer support functionality. Here without any login, you can chat with the admin, and get real time replies.
- Complete chat interface is built from scratch with React and TailwindCSS. Firebase - Realtime Firestore is used to store the conversations and fetch data realtime.
  
  User Side
  ![Screenshot (1500)](https://github.com/user-attachments/assets/a1d795bf-606f-48c8-b493-04183d2ca3c5)

  Admin Side
  ![Screenshot (1501)](https://github.com/user-attachments/assets/d417f863-1696-4e94-8629-fe70ef3badb5)


## Signup and Register Page
- Google oauth and Facebook auth added with extensive edge case handling

  Signup Page
  ![Screenshot (1503)](https://github.com/user-attachments/assets/bbc599a4-0b7e-4e4c-b505-59aff26d0a91)

  Signin Page
  ![Screenshot (1504)](https://github.com/user-attachments/assets/75f956cc-eb06-4f9b-a0af-74a54d93a239)

## User Dashboard
- Users upcoming appointment is fetched from the database. Every route is protected with authentication and authorization.

  ![Screenshot (1483)](https://github.com/user-attachments/assets/02bc4c66-11c4-4226-899f-37ce3cedb26e)

## Find a Doctor
- Used tailwind for UI of list of doctors to choose from.

  ![Screenshot (1505)](https://github.com/user-attachments/assets/eacdf2ea-f872-4330-9c86-d88d97d301ce)

## Book Appointment


