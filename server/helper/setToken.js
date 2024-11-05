import jwt from "jsonwebtoken";

export const setToken = (res, { _id, role }) => {
    console.log("scrap col hai -- ", role);
    const token = jwt.sign({ userId: _id, role }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000
    });
};
