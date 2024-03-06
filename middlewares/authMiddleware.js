const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res, next) => {
  const authHeader = await req.headers.authorization;
    console.log(authHeader);
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  if (!authHeader.startsWith('bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: wrong token provided' });
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    } else {
      // Attach the decoded token payload to the request object for further processing
      req.user = decodedToken;
      console.log("req.user:", req.user);
      next(); // Move to the next middleware or route handler
    }
  });
};

