const mongoose = require("mongoose")

const CourseSchema = mongoose.Schema({
   courseName: String,
})

module.exports = mongoose.model("Course", CourseSchema);