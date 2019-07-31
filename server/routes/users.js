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

router.post('/verify-email', async (req, res, next) => {
  const reqUser = req.session.passport.user;
  const userId = reqUser.id;
  const email = reqUser.email.toLowerCase();
  const user = await userLogic.getUserById(userId);

  if (!user) {

  } else {
    if (user.id === userId && req.body.emailVerificationId === user.emailVerificationId && Math.abs(new Date() - user.emailVerificationSentOn) < 24 * 60 * 60 * 100000) {
      userLogic.verifyEmail(userId);
    }
  }
})

router.post('/resend-email-verification', async (req, res, next) => {
  const reqUser = req.session.passport.user;
  const userId = reqUser.id;
  const email = reqUser.email.toLowerCase();
  const user = await userLogic.getUserById(userId);

  if (!user) {
    
  } else {
    await userLogic.resendEmailVerification(user.email, user.firstName, user.lastName, user.id);
  }
})

router.get('/loggedin', async function(req, res, next) {
  if (req.isAuthenticated()) {
    const reqUser = req.session.passport.user;
    const email = reqUser.email.toLowerCase();
    const user = await userLogic.getUserByEmail(email);
    return res.status(200).send({loggedIn: true, emailIsVerified: user.emailIsVerified});
  } else {
    return res.status(200).send({loggedIn: false});
  }
});

router.get('/email-verified', function(req, res, next) {
  return res.status(200).send( {emailIsVerified: user.emailIsVerified})
})




module.exports = router;
