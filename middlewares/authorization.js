const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Please provide token',
    });
  }

  const authToken = authHeader.split(' ')[1];

  const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
  req.user = decodedToken;
  next();
};

module.exports = authorization;
