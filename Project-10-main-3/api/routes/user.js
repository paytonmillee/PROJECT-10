const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { authenticateUser } = require("../middleware/auth-users");

router.get("/", authenticateUser, (req, res, next) => {
  User.findOne({
    where: { id: req.currentUser.id },
  })
    .then((user) => {
      res.status(200);
      res.json(user).end();
    })
    .catch((error) => {
      res.status(400);
      res.json(error).end();
    });
});

router.post("/", (req, res) => {
  const user = req.body;

  User.create(req.body)
    .then(res.location("/"))
    .then((userInfo) => {
      res.status(201).json(userInfo);
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
      res.end();
    });
});
module.exports = router;
