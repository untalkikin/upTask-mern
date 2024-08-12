import mongoose from 'mongoose';
import colors from 'colors';
import { exit } from 'node:process';

export const connectDB = async ()=>{
    try{
        const { connection }= await mongoose.connect(process.env.DATABASE_URL as string);
        const url = `${connection.host}:${connection.port}`
        console.log(colors.green.bold(`MongoDB connected on ${url}`));
    }catch(error){
        //console.log(error.message);
        console.log(colors.bgRed.bold('Error on db connection'))
        exit(1);
    }
};