const express = require('express');
const app = express();
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin/user');


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


app.use(bodyParser());
app.use('/api', userRoutes);
app.use('/api', adminRoutes);


app.listen(process.env.PORT, () =>{
    console.log(`server is running at port ${process.env.PORT}`);
});