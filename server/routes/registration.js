const express = require("express");
const router = express.Router();
const models = "./models";
const userLogic = require("../common/userLogic");


router.post('/', async (req, res, next) => {
    const email = req.body.email;
    const splitEmail = email.split('@');
    //check for valid email
    if (splitEmail.length === 2 && splitEmail[1].slice(-4) === '.edu') {
      const existingUser = await userLogic.getUserByEmail(email);
      console.log("existing user");
      console.log(existingUser);
      const newUser = req.body;
      //make sure the email isn't already in use
      if (!existingUser) {
        await userLogic.createUser(newUser);
        res.status(200).send({
          success: true,
          status: 'Account created!'
        });
      } else {
        res.status(200).send({
          success: false,
          status: 'Email already in use!'
        });
      }
    } else {
      res.status(200).send({
        success: false,
        status: 'Invalid email'
      });
    }

  });

module.exports = router;
