import expressSesion from "express-session"
import ConnectMongodbSession from "connect-mongodb-session"
import { MONGO_URI } from ".";
const MongoDBStore = ConnectMongodbSession(expressSesion);

const sessionStore = new MongoDBStore({
    uri: MONGO_URI!,
    collection: "session"
})


sessionStore.on("error", (err) => {
    console.log("mongo sesion error", err)
})



const Authenticate = async () => {

}
export { sessionStore }
