const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '2h' });
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'username, email and password are required' });
        }


        const exists = await User.findOne({ $or: [{ email }, { username }] });
        if (exists) {
            return res.status(409).json({ message: 'Username or email already in use' });
        }

        const passwordHash = bcrypt.hashSync(password, 10);
        const user = await User.create({ username, email, passwordHash, displayName: username });

        const token = generateToken({ id: user._id, username: user.username });
        res.status(201).json({
            token,
            user: { id: user._id, username: user.username, email: user.email, displayName: user.displayName }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        if (!emailOrUsername || !password) {
            return res.status(400).json({ message: 'emailOrUsername and password are required' });
        }


        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
        });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const valid = bcrypt.compareSync(password, user.passwordHash);
        if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken({ id: user._id, username: user.username });
        res.json({
            token,
            user: { id: user._id, username: user.username, email: user.email, displayName: user.displayName }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-passwordHash');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { displayName, avatarUrl } = req.body;
        const updated = await User.findByIdAndUpdate(
            req.user.id,
            { $set: { displayName, avatarUrl } },
            { new: true, runValidators: true, select: '-passwordHash' }
        );
        res.json({ user: updated });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};