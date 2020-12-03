const express = require('express');
const app = express();
const env = require('dotenv');
const path = require('path');

const mongoose = require('mongoose');

//routes
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin/user');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');


//enviroment variable
env.config();

//mongodb connection 
//mongodb+srv://admin:<password>@rhynocity.mrdby.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@rhynocity.mrdby.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() =>{
    console.log('database connected');
});


app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);


app.listen(process.env.PORT, () =>{
    console.log(`server is running at port ${process.env.PORT}`);
});