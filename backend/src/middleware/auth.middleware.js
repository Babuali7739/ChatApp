import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectedRoute = async (req, res, next) => {
  try {
    
    const token = req.cookies.jwt;
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select('-password');   
    if (!user) {
      return res.status(404).json({ message: 'Unauthorized: User not found' });
    }
    req.user = user;
    next();

  } catch (error) {
    console.log('Error in protectedRoute middleware:', error.message);

    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Unauthorized: Invalid or Expired Token' });
    }
     return res.status(500).json({ message: 'Server error' });
  } 
};