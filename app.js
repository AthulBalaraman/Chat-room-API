const express = require('express');
const app = express()
const errorHandlers = require('./handlers/errorHandler')
const db = require('./config/db')
require('dotenv').config()
const mongoose = require('mongoose')
const MessageModel = require("./models/Message")
const ChatroomModel = require("./models/Chatroom")
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// Database connection
db(()=>{
  try {
      console.log("DataBase Successfully Connected");        
  } catch (error) {
      console.log("Database Not Connected : ", error);        
  }
});


//Bring in the routes
app.use("/user",require('./routes/user'))
app.use("/chatroom", require("./routes/chatroom"))


// Setup Error handlers
app.use(errorHandlers.notFound)
app.use(errorHandlers.mongoseErrors)
if(process.env.ENV === "DEVELOPMENT")
{
  app.use(errorHandlers.developmentErrors)
}else{
  app.use(errorHandlers.productionErrors)
}




app.listen(5000,()=>{
  console.log("Server running at port 5000")
})


