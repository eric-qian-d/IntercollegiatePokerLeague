const sgMail = require('@sendgrid/mail');
const models = require('../models');

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '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');

module.exports = {
  sendWelcomeEmail: async (email, firstName, lastName, emailVerificationId) => {
    const msg = {
      to: email,
      from: 'admin@pokerzone.io',
      subject: 'Welcome to PokerZone!',
      text: 'Let\'s verify your email!',
      html: '<p> Welcome, '.concat(firstName, '! Let\'s verify your email! Your code is ', emailVerificationId, '</p>'),
    };

    sgMail.send(msg);
  }


}
