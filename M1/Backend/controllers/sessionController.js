import { StudySession } from '../models/schema.js';

export const createSession = async (req, res) => {
    try {
        const session = new StudySession(req.body);
        await session.save();
        res.status(201).json(session);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getSessions = async (req, res) => {
    try {
        const sessions = await StudySession.find();
        res.json(sessions);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};