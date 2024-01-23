import {app} from "./app";
import dotenv from 'dotenv'
import {runDb} from "./repositories/db";

dotenv.config()

const port = process.env.PORT || 3005


const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()