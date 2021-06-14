const express = require("express");
const router = express.Router();
const { Course, User } = require("../models");
const { authenticateUser } = require("../middleware/auth-users");

router.get("/", (req, res) => {
  Course.findAll({
    include: [
      {
        model: User,
      },
    ],
  })
    .then((data) => {
      console.log(data);
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

router.get("/:id", (req, res) => {
  Course.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: User,
      },
    ],
  })
    .then((course) => {
      res.status(200).json(course).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(400);
      res.json(error).end();
    });
});

router.post("/", authenticateUser, (req, res) => {
  console.log(req.body);
  Course.create(req.body)
    .then((course) => {
      res.status(201).json(course).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(400);
      res.json(error).end();
    });
});

router.put("/:id", authenticateUser, function (req, res, next) {
  if (!req.body.title || !req.body.description) {
    res.status(400);
    res.json({ error: "you must supply a title or user" });
    return;
  }
  Course.findByPk(req.params.id)
    .then(function (course) {
      course
        .update(req.body)

        .then((course) => {
          res.status(204).json(course).end();
        })
        .catch((error) => {
          res.status(400);
          res.json(error).end();
        });
    })
    .catch((error) => {
      res.status(400);
      res.json(error).end();
    });
});

//delete course
router.delete("/:id", authenticateUser, function (req, res, next) {
  Course.findByPk(req.params.id)
    .then((course) => {
      course.destroy();
      res.status(204).end();
    })
    .catch((error) => {
      res.status(400);
      res.json(error).end();
    });
});

module.exports = router;
