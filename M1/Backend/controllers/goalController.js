import { LearningGoal } from '../models/schema.js';

export const createGoal = async (req, res) => {
    try {
        const goal = new LearningGoal(req.body);
        await goal.save();
        res.status(201).json(goal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getGoals = async (req, res) => {
    try {
        const goals = await LearningGoal.find();
        res.json(goals);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};