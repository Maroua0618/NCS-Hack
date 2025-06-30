import { StudyBuddy } from '../models/schema.js';

export const createBuddyRequest = async (req, res) => {
    try {
        const buddyRequest = new StudyBuddy(req.body);
        await buddyRequest.save();
        res.status(201).json(buddyRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getBuddyRequests = async (req, res) => {
    try {
        const requests = await StudyBuddy.find();
        res.json(requests);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};