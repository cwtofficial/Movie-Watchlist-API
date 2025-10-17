const { StatusCodes } = require('http-status-codes');

const notFound = async (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    message: 'Route does not exist',
  });
};

module.exports = notFound;
