# To-Do List App

A full-stack To-Do List application built with React, Express.js, MongoDB, and Tailwind CSS.

## Features
- User authentication (signup, login, logout) with JWT
- Token revocation/blacklist support
- CRUD operations for personal to-do items
- Filter todos by status
- Responsive UI with Tailwind CSS
- Secure backend with password hashing and middleware

## Prerequisites
- Node.js (>=18.x)
- git
- npm

## Setup
1. Clone this Repository 
```
git clone https://github.com/SushantGaikwad/Todo-Frontend.git
```
2. Install Dependencies 
```
 npm install
 ```
3. Create .env file you can copy values from .env.example file and replace with you own data
```
VITE_API_URL=http://localhost:3001/api
```

4. Start the server 
```
npm run dev
```

5. Open http://localhost:5173 in your browser.

6. To run test cases
```
npx playwright install
npm run test
```



