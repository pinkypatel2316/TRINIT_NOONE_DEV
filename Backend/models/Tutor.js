const mongoose = require("mongoose");

const TutorSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  languages: [String],
  fluency: [String],
  exp: [String],
  pricing: [{ 45: String, 60: String, 90: String }],
  profilePhoto: String,
  bookedTimeslots: {
    german: {
      45: [
        {
          from: String,
          startDay: String,
          batch_count: { type: String, default: "50" },
          studentids: [String],
        },
      ],
      60: [
        {
          from: String,
          startDay: String,
          batch_count: { type: String, default: "50" },
          studentids: [String],
        },
      ],
      90: [
        {
          from: String,
          startDay: String,
          batch_count: { type: String, default: "50" },
          studentids: [String],
        },
      ],
    },
  },
});

module.exports = mongoose.model("Tutor", TutorSchema);
