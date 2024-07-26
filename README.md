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
