import jwt from "jsonwebtoken";

export const setToken = (res, { _id, role }) => {
    const token = jwt.sign({ userId: _id, role }, process.env.JWT_SECRET, {
        expiresIn: '1h', 
    });

    console.log("token hai ?",token);

    res.cookie('token', token, {
        httpOnly: true, 
        secure: false, 
        maxAge: 60 * 60 * 1000, 
        sameSite: 'None', 
    });

    console.log("Set-Cookie Header:", res.getHeaders()['set-cookie']);
};
