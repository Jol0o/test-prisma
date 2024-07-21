// server.js

const express = require('express');
const prisma = require('@prisma/client').PrismaClient;
const app = express();
const port = 8080;

// Initialize Prisma Client
const db = new prisma();

// Middleware
app.use(express.json());

// Routes
const taskRouter = require('./routes/taskRoutes');
app.use('/api/tasks', taskRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
