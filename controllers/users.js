const { StatusCodes } = require('http-status-codes');
const UserSchema = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
const register = async (req, res) => {
  try {
    const data = req.body;
    console.log('This the registration details:', data);
    if (!data.name || !data.email || !data.password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Please provide name, email and password.',
      });
    }
    const hashedPassword = await bcrypt.hash(
      data.password,
      process.env.SALT_ROUNDS,
    );
    const newUser = await UserSchema.create({
      ...data,
      password: hashedPassword,
    });
    res.status(StatusCodes.CREATED).json({
      message: 'User is created successfully.',
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const data = req.body;
  const { email, password } = data;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Please provide email and password.',
    });
  }
  try {
    const user = await UserSchema.findOne({ email: email });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'User not found.',
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Incorrect Password.',
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    const userToJsObject = user.toObject();
    const { password: hashedPassword, ...otherData } = userToJsObject;
    res.status(StatusCodes.CREATED).json({
      message: 'Login is successful',
      user: otherData,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const data = req.body;
    if (!data) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Please provide data.',
      });
    }
    const user = await UserSchema.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'User not found.',
      });
    }

    res.status(StatusCodes.OK).json({
      message: 'update is successful',
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  const { id } = req.user;

  const user = await UserSchema.findById(id).select('-password');
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'User not found.',
    });
  }
  res.status(StatusCodes.OK).json({
    message: 'user details is  returned successfully.',
    user: user,
  });
};
// const deleteProfile =

module.exports = { register, login, updateProfile, getUserProfile };
