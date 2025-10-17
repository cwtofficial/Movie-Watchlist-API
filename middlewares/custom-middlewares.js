const logger = (req, res, next) => {
  console.log('Logger...');
  console.log('This is the request method:', req.method);
  console.log('This is the request url', req.url);
  next();
};

const blocker = (req, res, next) => {
  if (req.url === '/blocked') {
    console.log('Request is Blocked.');
    return res.status(403).json({
      success: false,
      message: 'The route is blocked by a middleware',
    });
  }

  next();
};

const customHeader = (req, res, next) => {
  console.log('Adding Custom Header...');
  res.setHeader('X-PoweredBy', 'Express');
  next();
};

module.exports = { logger, blocker, customHeader };
