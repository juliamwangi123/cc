const mongoose = require('mongoose');


const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
      },
      email: {
        type: String,
        required: true,
      },
})

module.exports = mongoose.model("profile", ProfileSchema)

