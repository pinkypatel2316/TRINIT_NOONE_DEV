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
    tutor.password = undefined;
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
    const findUser = await Tutor.findOne({ email: req.body.email });
    if (findUser) {
      if (findUser.password === req.body.password) {
        res.status(200).json({
          msg: "ok",
          data: findUser,
        });
      } else {
        res.status(200).json({
          msg: "incorrect password",
        });
      }
    } else {
      res.status(200).json({
        msg: "User does not exist",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const findTutor = await Tutor.findById(req.params.id);
    if (!findTutor) {
      return res.status(400).json({ message: "Tutor does not exist" });
    }
    await Tutor.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).json({
      data: findTutor,
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
