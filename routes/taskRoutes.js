// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const prisma = new (require('@prisma/client').PrismaClient)();

// Create a task
router.post('/', async (req, res) => {
    const { title, description, completed } = req.body;
    try {
        const task = await prisma.task.create({
            data: { title, description, completed },
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: 'Error creating task' });
    }
});

// Read all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

// Read a single task
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await prisma.task.findUnique({
            where: { id: Number(id) },
        });
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching task' });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const task = await prisma.task.update({
            where: { id: Number(id) },
            data: { title, description, completed },
        });
        res.json(task);
    } catch (error) {
        res.status(404).json({ error: 'Task not found' });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.task.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: 'Task not found' });
    }
});

module.exports = router;
