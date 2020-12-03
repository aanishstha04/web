const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true 
    },
    price: {
        type: Number,
        require: true
    },
    quantity:{
        type:Number,
        required: true
    },
    description:{
        type: String,
        require: true,
        trim: true
    },
    offer:{
        type: Number
    },
    category:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true
    },
    productPicture:[{img: {type: String}}],
    reviews: [
        {
            userId: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
             review:String
        }
    ],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    updateAt:Date
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);