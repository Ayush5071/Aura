import jwt from "jsonwebtoken"

export const setToken = (res,{id,role}) => {
    const token = jwt.sign({id,role},process.env.JWT_SECRET,{
        expiresIn: '1h'
    }); 

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000
      });
}