const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  languages: [String],
  bookedTimeslots: [
    {
      from: String,
      startDay: String,
      tutorid: String,
      slot: String,
      language: String,
    },
  ],
  flashcards: [
    {
      language: String,
      front: String,
      back: String,
    },
  ],
  profilePhoto: String,
});

module.exports = mongoose.model("Student", StudentSchema);
