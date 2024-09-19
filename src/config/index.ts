import Dotenv from "dotenv";

Dotenv.config();


const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const MONGO_URI = process.env.MONGO_URI;


export { PORT, BASE_URL, MONGO_URI }