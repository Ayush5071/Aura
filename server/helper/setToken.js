import jwt from "jsonwebtoken";

export const setToken = (res, { _id, role }) => {
    const token = jwt.sign({ userId: _id, role }, process.env.JWT_SECRET, {
        expiresIn: '1h', 
    });

    console.log("token hai ?",token);
    res.cookie('token', token, {
        httpOnly: false, // Temporarily set to false for debugging
        secure: false, // Disable for local development
        maxAge: 3600000,
        path: '/',
      });
      
    console.log("Set-Cookie Header:", res.getHeaders()['set-cookie']);
};
