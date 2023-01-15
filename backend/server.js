const express = require('express')
const cors = require('cors')
require('dotenv').config();
const authRoutes = require('./routes/auth-routes.js');
const app = express()
const PORT = 3000 || process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.get('/',(req,res)=>{
    res.send('Hello there!');
})

app.use('/api/auth',authRoutes)



app.listen(PORT,()=>console.log(`app running on port ${PORT}`))