import mongoose from "mongoose";

//connect to the mongoDB database

const connectDB = async () =>{
    try {
        mongoose.connection.on('connected', ()=> console.log('Database Connected'));

        await mongoose.connect(`${process.env.MONGODB_URI}/eduvibe`)
    } catch (error) {
        console.log("ERR",error);
        process.exit(1)
        
    }
}


export default connectDB