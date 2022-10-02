const app = require("./index")
const mongoose = require("mongoose")

//connecting db
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true} , function(err){
    if(err){
        console.log(err);
    } else{
        console.log("Database Connected Successfully");
    }
});



//server
app.listen(process.env.PORT || 5000 , (req,res)=>{ 
   console.log("Server running on port 5000");
});


