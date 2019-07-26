const express = require("express");
const router = express.Router();
const models = "./models";
const userLogic = require("../common/userLogic");

router.post('/registration', async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const splitEmail = email.split('@');
  //check for valid email
  if (splitEmail.length === 2 && splitEmail[1].slice(-4) === '.edu') {
    const existingUser = await userLogic.getUserByEmail(email);
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

router.get('/loggedin', function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(200).send({loggedIn: true});
  } else {
    return res.status(200).send({loggedIn: false});
  }
});




module.exports = router;
