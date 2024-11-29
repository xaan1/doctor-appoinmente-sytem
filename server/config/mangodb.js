import mongoose from "mongoose";


const connectDB = async () => {

    try {


        await mongoose.connect(process.env.Mongo_url) .then(() => {
            console.log("Mongodb connected");
        }).catch((err) => {
            console.log(err);
        });

    } catch(e){
        console.log(e ,"error in Mongodb");
    }

}



export default connectDB;