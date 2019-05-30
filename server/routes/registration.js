const express = require("express");
const router = express.Router();
const models = "./models";
const userLogic = require("../common/userLogic");


// console.log("testing");

router.post('/', (req, res, next) => {
    console.log('received req');
    const newUser = req.body;
    userLogic.createUser(newUser);
  });

router.get('/test', (req,res, next) => {
  console.log("success");
});

module.exports = router;
