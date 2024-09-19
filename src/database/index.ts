import mongoose from "mongoose"
import { MONGO_URI } from "../config"

const connectToDB = async () => {
    try {
        const dbres = await mongoose.connect(MONGO_URI!)
        if (dbres?.connection?.host) {
            console.log(`Databse connected to : ${dbres.connection.host} ✔`);
        }
    } catch (error: any) {
        return console.log(`Databse connection failed due to: ${error?.message}`)
    }
}


export { connectToDB }