# Project Setup

This project is a server-side application built with Node.js, Express, and MongoDB. Follow the steps below to set up the project locally.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local instance or MongoDB Atlas)

## Installation

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   cd server
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `server` directory and add the following variables:

   ```env
   PORT=8000
   MONGODB_URI=<your-mongodb-uri>
   ```

4. **Start the server:**

   ```sh
   npm run dev
   ```

   The server should now be running on `http://localhost:8000`.

## Database Schema

Entity Relational Diagram: [LucidChart Diagram](https://lucid.app/lucidchart/14b4ccd1-a3b4-45ad-85ea-be1d9fb28907/edit?viewport_loc=-858%2C-1341%2C2148%2C1163%2C0_0&invitationId=inv_8ca05848-af07-43e4-9065-f544a2556100)

The database schema is defined using Mongoose models. You can find the schema definitions in the following files:

- [Classroom Schema](server/src/models/classroom.model.js)
- [Teacher Schema](server/src/models/teacher.model.js)
- [Task Schema](server/src/models/task.model.js)
- [Student Schema](server/src/models/student.model.js)
- [User Schema](server/src/models/user.model.js)
