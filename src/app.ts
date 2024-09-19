import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import { connectToDB } from './database'

const app = express()

const admin = new AdminJS({
    branding: {
        companyName: "XecureCode",
        logo: "",
        withMadeWithLove: false
    }
})

const adminRouter = AdminJSExpress.buildRouter(admin)


app.use("/admin", adminRouter)


const start = async () => {

    connectToDB().then(() => {
        app.listen(4000, () => {
            console.log(`Server started on http://localhost:4000`)
            console.log(`AdminJS started on http://localhost:4000/admin`)
        })
    })
}


start()
