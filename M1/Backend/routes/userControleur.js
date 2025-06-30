export const createUser = async (req, res) => {
    const { email, password, firstName, lastName, username } = req.body;

    console.log("Signup request received:", req.body); // 🔍 Ajout du log

    try {
        const user = new User({ email, password, firstName, lastName, username });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
