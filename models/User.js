const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['member','admin'], default: 'member' }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const sel = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, sel);
        next()
    } catch (err) {
        next(err);
    }
});
    userSchema.methods.ComparePassword = async function (password) {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (err) {
            console.log(err.message);
        }
    }

    userSchema.methods.ComparePassword = async function (password) {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (err) {
            throw err;
        }
    };
module.exports = mongoose.model('User', userSchema);
