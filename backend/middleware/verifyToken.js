import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  // console.log(token);
  if (!token) {
   return res.status(401).json({
      message: "please Login",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "Please Login",
      });
    }
    // console.log(user)
  
    
  req.user=user

    next();
  });
};