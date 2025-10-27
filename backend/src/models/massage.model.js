import mongoose from 'mongoose';

const massageSchema = new mongoose.Schema({
    senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },
    receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },
    text : {
    type: String,
    },
    image : {
    type: String,
    },
},
    {   timestamps: true }
);


const Massage = mongoose.model('Massage', massageSchema);
export default Massage;