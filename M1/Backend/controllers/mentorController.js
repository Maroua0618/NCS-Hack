import { Mentor } from '../models/schema.js';

export const createMentor = async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(201).json(mentor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.json(mentors);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};