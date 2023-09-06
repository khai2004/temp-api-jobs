const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position '],
      maxlength: 20,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    //using for specific user
    createdBy: {
      type: mongoose.Types.ObjectId, //using to take id from user
      ref: 'User', // link to user folder
      required: [true, 'Please provide user'],
      //have to provide user imfomation.
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
