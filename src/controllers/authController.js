const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const register = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;

        const existingUser = await User.query().findOne({ email })
        if (existingUser) return res.status(400).json({ message: 'user already exists' })
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.query().insert({
            userName, email, password: hashPassword, role: role || 'customer',
        })
        res.status(201).json({ message: 'User Register Successfully', user: newUser })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.query().findOne({ email })
        if (!user) return res.status(400).json({ message: 'Invalid email or password' })
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return res.status(400).json({ message: 'Invalid email or password' })
        const token = jwt.sign(
            { id: user.id, email: user.email, userName: user.userName, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token, user: { id: user.id, email: user.email, userName: user.userName, role: user.role } })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }

}
module.exports = { register, login }