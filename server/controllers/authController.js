import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';
import { setToken } from '../helper/setToken.js';

export const registerUser = async (req, res) => {
  const { name, email, password, contactNumber, address, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      contactNumber,
      address,
      role
    });

    await user.save();

    const {_id,role} = user;

    setToken(res,{_id,role});

    res.status(201).json({ msg: 'User registered successfully', userId: user._id, role: user.role });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const {_id,role} = user;

      setToken(res,{_id,role});
      res.json({ msg: 'Logged in successfully', userId: user._id, role: user.role });
    } catch (error) {
      res.status(500).json({ error: 'Server error', error });
    }
  };
  

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token'); 
    res.json({ msg: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};
