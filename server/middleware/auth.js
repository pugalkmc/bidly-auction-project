import jwt from 'jsonwebtoken';

const secretKey = 'pugalkmc';

const authenticateToken = (req, res, next) => {
  console.log(req.url)
  if (req.url==='/login' || req.url==='/signup'){
    return next();
  }
  // return next();
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.redirect('/login');

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.redirect('/login');
    req.user = user;
    next();
  });
};

export default authenticateToken;
