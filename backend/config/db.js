const mongoose = require('mongoose');

const connectDb = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`Mongodb connected: ${conn.connection.host}`);
    }catch(error) {
        console.log("error in connecting db", error);
        process.exit();
    }
}

module.exports = connectDb;