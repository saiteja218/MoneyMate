import jwt from 'jsonwebtoken';
// console.log("JWT_SECRET:", process.env.JWT_SECRET);  


export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  // console.log("NODE_ENV:", process.env.NODE_ENV);

  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, 
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === 'production'
    ,
  });

  return token;
};
