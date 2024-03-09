const mongoose = require("mongoose")

const StudentSchema = mongoose.Schema({
   name: String,
   email: String,
   password: String,
   language: String,
   bookedTimeslots: [
      {
         tutorid:String,
         slot:String,
         from:String,
         to:String,
         day:String
      }
   ],
   flashcards: [{
      front : String,
      back : String
       }],
   profilePhoto:String
})

module.exports = mongoose.model("Student", StudentSchema);