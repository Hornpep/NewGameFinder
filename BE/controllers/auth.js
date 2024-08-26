import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registrierung eines neuen Users
export const signup = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return next(new ErrorResponse('User already exists', 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = { httpOnly: true, sameSite: isProduction ? 'None' : 'Lax', secure: isProduction };

    res.cookie('token', token, cookieOptions);
    res.status(201).json({ success: 'Welcome aboard, Player One!' });
});

// Anmeldung eines vorhandenen Users
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return next(new ErrorResponse('User not found', 404));
    console.log(user);
    console.log(password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) return next(new ErrorResponse('Unauthorized', 401));

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = { httpOnly: true, sameSite: isProduction ? 'None' : 'Lax', secure: isProduction };

    res.cookie('token', token, cookieOptions);
    res.status(200).json({ success: 'Game Mode: Activated!' });
});

export const whoAmI = asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    res.status(200).json({ success: user });
});

// Abmeldung des Benutzers und Löschen des Cookies
export const logout = asyncHandler(async (req, res, next) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = { httpOnly: true, sameSite: isProduction ? 'None' : 'Lax', secure: isProduction };
     
    res.clearCookie('token');
    res.status(200).json({ success: 'See you in the next level!' });
});