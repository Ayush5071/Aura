import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';
import ScrapCollector from '../models/scrapCollector.models.js';

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const isCustomer = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    if (req.user.role !== 'customer') {
      return res.status(403).json({ error: 'Access denied, not a customer' });
    }

    next(); 
  } catch (error) {
    return res.status(500).json({ error: 'Server error', error });
  }
};

export const isScrapCollector = async (req, res, next) => {
  try {
    const scrapCollector = await ScrapCollector.findById(req.user.userId);

    if (!scrapCollector) {
      return res.status(404).json({ error: 'Scrap collector not found' });
    }

    if (req.user.role !== 'scrapCollector') {
      return res.status(403).json({ error: 'Access denied, not a scrap collector' });
    }

    next(); 
  } catch (error) {
    return res.status(500).json({ error: 'Server error', error });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied, admin only' });
    }

    next(); 
  } catch (error) {
    return res.status(500).json({ error: 'Server error', error });
  }
};
