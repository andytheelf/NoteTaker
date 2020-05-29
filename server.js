//Require const.

const express = require("express");
const app = express();

//Port add in 
const PORT = process.env.PORT || 3000;












//App.listen addition to call port 
app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
})