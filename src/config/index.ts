import Dotenv from "dotenv";

Dotenv.config();


const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const MONGO_URI = process.env.MONGO_URI;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET


export { PORT, BASE_URL, MONGO_URI, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET }