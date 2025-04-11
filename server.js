import express from 'express';
import { connectDb } from './src/Db/dbconfig.js';
import route from './src/router/user.router.js'



const app = express()


const port = process.env.PORT

console.log(connectDb())
app.use(express.json())
app.use("", route)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})