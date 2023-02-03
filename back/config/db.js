const mongoose = require("mongoose")

mongoose.connect(
    "mongodb+srv://"
    + process.env.DB_USER_PASS +
    
)
.then(()=> console.log("connecté à mongoDB"))
.catch((err) => console.log("echec de connexion à mongoDB", err))
