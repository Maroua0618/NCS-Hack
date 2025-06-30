import { User } from '../models/schema.js';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    const { email, password, firstName, lastName, username } = req.body;

    try {
        const user = new User({ email, password, firstName, lastName, username });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a user by ID
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a user by ID
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password }); // Log input

    try {
        const user = await User.findOne({ email });
        console.log('Retrieved user:', user); // Log retrieved user

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Directly compare passwords
        if (password !== user.password) {
            console.log('Password mismatch'); // Log if passwords don't match
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user._id });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};