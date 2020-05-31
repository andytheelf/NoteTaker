//Global variables
const htmlRoutes = require('./routes/htmlRoutes/htmlRoutes')
const apiRoutes = require('./routes/apiRoutes/apiRoutes')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

//App uses
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.use('/api', apiRoutes)
app.use('/', htmlRoutes)

//Server Listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});