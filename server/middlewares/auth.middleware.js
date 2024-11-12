import jwt, { decode } from "jsonwebtoken";
import User from '../models/user.models.js';
import ScrapCollector from '../models/scrapCollector.models.js';

export const isAuthenticated = (req, res, next) => {
    console.log("token hinhi mila");
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer "," "); 

    console.log(token, "hai token ?");
    
    if (!token) {
        return res.status(401).json({ error: 'Not authenticated, token missing' });
    }

    console.log("ye chl rha h");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decode,"milaaaa yyeeeyeyeyyeyeyeyeye")
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };


        console.log("Scrap collector userId ->", req.user.userId);
        console.log("Scrap collector role ->", req.user.role);

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

        if (user.role !== 'customer') {
            return res.status(403).json({ error: 'Access denied, not a customer' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Server error', error });
    }
};

export const isScrapCollector = async (req, res, next) => {
    try {
        console.log("aya yha")
        const scrapCollector = await ScrapCollector.findById(req.user.userId);
        console.log("scrpa collll --",scrapCollector);

        if (!scrapCollector) {
            return res.status(404).json({ error: 'Scrap collector not found' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Server error', error });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied, admin only' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Server error', error });
    }
};
