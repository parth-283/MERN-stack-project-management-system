# MERN Task Management System

This is a full-stack task management system built using the MERN (MongoDB, Express, React, Node.js) stack. It includes user authentication, task management, and WebSocket-based real-time updates.

## Features

- **User Authentication**: Register, login, and logout functionality with JWT-based authentication.
- **Task Management**: Add, update, delete, and view tasks.
- **Real-Time Updates**: WebSocket integration for real-time task updates.
- **Role-Based Access Control**: Admin, Team, and Manager roles.
- **Frontend**: Built with React and Redux for state management.
- **Backend**: Built with Express.js and MongoDB for data storage.

## Project Structure

```
.env
.gitignore
index.mjs
LICENSE
package.json
Controllers/
Middleware/
Models/
Routes/
Utils/
WebSockets/
frontend/
```

### Backend

- **Controllers**: Contains business logic for authentication and user management.
- **Middleware**: Includes authentication middleware.
- **Models**: MongoDB schemas for users and tasks.
- **Routes**: API routes for authentication and user management.
- **Utils**: Utility functions for JWT generation, password encryption, and email sending.
- **WebSockets**: WebSocket server for real-time task updates.

### Frontend

- **React**: Frontend built with React.
- **Redux**: State management using Redux Toolkit.
- **Components**: Reusable UI components like TaskCard, Header, and WebSocketComponent.
- **Routes**: React Router for navigation.
- **Styling**: CSS and SCSS for styling.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   Create a `.env` file in the root directory and add the following:

   ```
   PORT=5000
   MONGOOSE_URI=your_mongodb_connection_string
   SECRET_WEB_TOKEN=your_secret_key
   USER_EMAIL=your_email
   USER_PASSWORD=your_email_password
   ```

4. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

5. Build the frontend:

   ```bash
   npm run build
   ```

## Running the Project

1. Start the backend server:

   ```bash
   npm run serve
   ```

2. Start the frontend in development mode:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login a user.
- **GET** `/api/auth/logout`: Logout a user.
- **GET** `/api/auth/me`: Get the authenticated user's details.
- **PATCH** `/api/auth/update`: Update user details.

### WebSocket Actions

- **getTask**: Fetch all tasks.
- **addTask**: Add a new task.
- **updateTask**: Update task status.
- **deleteTask**: Delete a task.

## Technologies Used

- **Frontend**: React, Redux, Material-UI, SCSS
- **Backend**: Node.js, Express.js, MongoDB, WebSocket
- **Authentication**: JWT
- **Other Tools**: Nodemailer, bcrypt, dotenv

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Developed by Parth Kathiriya.
