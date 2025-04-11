import mongooose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export let connectDb = async () => {

    try {
        await mongooose.connect(process.env.MONGO_URI);

        console.log("Db connected suceesfully")

    } catch (error) {
        console.log("something went wrong while connecting to db", error);
    }
}


