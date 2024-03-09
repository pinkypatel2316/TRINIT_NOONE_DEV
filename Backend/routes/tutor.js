const express = require("express");
const router = express.Router();
const Tutor = require("../models/Tutor");

router.get("/", async (req, res) => {
  try {
    const tutor = await Tutor.find();
    res.status(200).json({
      data: tutor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    res.status(200).json({
      data: tutor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    var newtutor = new Tutor(req.body);
    newtutor = await newtutor.save();
    res.status(200).json({
      data: newtutor,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const findUser = await Tutor.findOne({ email: req.body.email })
    if (findUser) {
      if (findUser.password === req.body.password) {
        res.status(200).json({
          msg: "ok",
          data: findUser,
        })

      } else {
        res.status(200).json({
          msg: "incorrect password",
        })
      }
    } else {
      res.status(200).json({
        msg: "User does not exist"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send("server error")
  }
})

router.put("/:id", async (req, res) => {
  try {
    const findtutor = await Tutor.findById(req.params.id);
    if (!findtutor) {
      return res.status(400).json({ message: "tutor does not exist" });
    }
    findtutor.name = req.body.name || findtutor.name;
    findtutor.email = req.body.email || findtutor.email;
    findtutor.password = req.body.password || findtutor.password;
    findtutor.languages = req.body.languages || findtutor.languages;
    findtutor.fluency = req.body.fluency || findtutor.fluency;
    findtutor.exp = req.body.exp || findtutor.exp;
    findtutor.pricing = req.body.pricing || findtutor.pricing;
    findtutor.bookedTimeslots = req.body.bookedTimeslots || findtutor.bookedTimeslots;
    findtutor.profilePhoto = req.body.profilePhoto || findtutor.profilePhoto;
    const updatedtutor = await Tutor.save();
    res.status(200).json({
      data: updatedtutor,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Tutor.findByIdAndRemove(req.params.id);
    res.status(200).json({
      message: "tutor is deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
