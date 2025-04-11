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
    }

});

export const user = mongoose.model('user', userSchema);
