import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import asyncHandler from '../utils/asyncHandler.js';
import upload from '../utils/multer.js';

export const whoAmI = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ error: 'You are not logged in!' });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong!' });
  }
};

export const signUp = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: 'Please provide a username, email, and password.' });
  
    const alreadyExists = await User.findOne({ where: { email } });
    if (alreadyExists) return res.status(400).json({ error: 'User already exists.' });
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
  
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = { httpOnly: true, sameSite: isProduction ? 'None' : 'Lax', secure: isProduction };
  
    res.cookie('token', token, cookieOptions);
    res.status(201).json({ success: 'Welcome aboard!' });
  });
 
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Unauthorized" });
  
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = { httpOnly: true, sameSite: isProduction ? 'None' : 'Lax', secure: isProduction };
  
    res.cookie('token', token, cookieOptions);
    res.status(200).json({ success: 'Welcome back!' });
  });
  
export const logout = asyncHandler(async (req, res) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = { httpOnly: true, sameSite: isProduction ? 'None' : 'Lax', secure: isProduction };
  
    res.clearCookie('token', cookieOptions);
    res.status(200).json({ success: 'Goodbye!' });
  });
  
export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error('Please provide id in the params');
        const userToGet = await User.findOne({ where: { id } });
        if (!userToGet) throw new Error('User not found');
        res.status(200).json(userToGet);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Pfad zum hochgeladenen Bild
  
    try {
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email, and password.' });
      }
  
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hashedPassword, image });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, image } = req.body;
    try {
        if (!id) throw new Error('Please provide id in the params');
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide username, email and password in the body' });
        }
        const userToUpdate = await User.findOne({ where: { id } });
        if (!userToUpdate) throw new Error('User not found');
        userToUpdate.username = username;
        userToUpdate.email = email;
        userToUpdate.password = password;
        userToUpdate.image = image;
        await userToUpdate.update();
        res.status(200).json(userToUpdate);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error('Please provide id in the params');
        const userToDelete = await User.findOne({ where: { id } });
        if (!userToDelete) throw new Error('User not found');
        await User.destroy({ where: { id } });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

