// File: Backend/routes/userRoutes.js
import express from 'express';
import { createUser, getUser, updateUser, loginUser } from '../controllers/userController.js';
import { User } from '../models/schema.js'; // Import the User model

const router = express.Router();

router.post('/', createUser); 
router.post('/login', loginUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);

// Update user quiz results
router.put('/:userId/quiz-results', async (req, res) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;

        console.log('Received update data:', updateData);
        console.log('User ID:', userId);

        // Validate userId format
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid user ID format' 
            });
        }

        // Find and update the user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    learningStyle: updateData.learningStyle,
                    personalityStyle: updateData.personalityStyle,
                    testResults: updateData.testResults,
                    quiz: updateData.quiz,
                    updatedAt: new Date()
                }
            },
            { 
                new: true, // Return the updated document
                runValidators: true // Run schema validators
            }
        );

        if (!updatedUser) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        console.log('User updated successfully:', updatedUser._id);

        res.status(200).json({
            success: true,
            message: 'Quiz results updated successfully',
            data: {
                user: updatedUser
            }
        });

    } catch (error) {
        console.error('Error updating quiz results:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update quiz results',
            error: error.message 
        });
    }
});

export default router;