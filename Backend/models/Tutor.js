const mongoose = require("mongoose")

const TutorSchema = mongoose.Schema({
   name: String,
   email: String,
   password: String,
   languages: [String],
   fluency: [String],
   exp:[String],
   pricing:[{45:String,60:String,90:String}],
   bookedTimeslots:[Object],
   profilePhoto:String
})

module.exports = mongoose.model("Tutor", TutorSchema);