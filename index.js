const express = require('express')
const app = express()
const port = 8080
const userRoutes = require('./src/routes/user')
const indexRoute = require('./src/routes/index')


app.use(express.json());
app.use('/users', userRoutes);
app.use('/', indexRoute);


app.listen(port, () => {
    console.log(`app listen at http://localhost:${port}`)
})


