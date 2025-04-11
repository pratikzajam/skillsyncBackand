import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    fullName: {
        type: String,
    },
    dateOfBirth: {
        type: Date
    },
    phoneNo: {
        type: String,
    },
    address: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],

    },
    skills: {
        type: [String],
        default: []
    },
    candidate_type: {
        type: String,
        enum: ['fresher', 'experience'],

    },
    yearOfExp: {
        type: Number,
    },
    githubLink: {
        type: String,
    },
    linkDinLink: {
        type: String,
    }

});

export const user = mongoose.model('user', userSchema);
