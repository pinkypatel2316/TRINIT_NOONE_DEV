const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/", async (req, res) => {
  try {
    const student = await Student.find();
    res.status(200).json({
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json({
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    var newStudent = new Student(req.body);
    newStudent = await newStudent.save();
    res.status(200).json({
      data: newStudent,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const findUser = await Student.findOne({ email: req.body.email })
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
    const findStudent = await Student.findById(req.params.id);
    if (!findStudent) {
      return res.status(400).json({ message: "Student does not exist" });
    }
    await Student.findByIdAndUpdate({_id:req.params.id},req.body,{new: true});
    res.status(200).json({
      data: findStudent,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndRemove(req.params.id);
    res.status(200).json({
      message: "Student is deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
