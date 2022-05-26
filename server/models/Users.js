import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String
        },
        userName: {
            type: String
        },
        password: {
            type: String
        }
    }, 
    { timestamps: true}
)

export default mongoose.model('User', UserSchema )