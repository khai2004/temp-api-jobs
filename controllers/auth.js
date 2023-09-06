const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  //need to understand
  const user = await User.create({ ...req.body });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const delter = async (req, res) => {
  //need to understand
  const user = await User.deleteMany({}, (err) => {
    if (err) {
      console.error('Lỗi khi xóa dữ liệu:', err);
    } else {
      console.log('Xóa toàn bộ dữ liệu thành công');
    }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //have to pass in something
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });
  //compare password that read from client
  if (!user) {
    //apply if there is nothing fit in db
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    //apply if there is nothing fit in db
    throw new UnauthenticatedError('Invalid Credentials');
  }
  //compare password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: { name: user.name },
    token,
  });
};

module.exports = {
  register,
  login,
  delter,
};
