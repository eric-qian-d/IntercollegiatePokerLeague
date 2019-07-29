const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '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');

// module.exports = {
//   sendWelcome: async (firstName, lastName, email, )
//
//
// }

const msg = {
  to: 'eric.qian.d@gmail.com',
  from: 'admin@pokerzone.io',
  subject: 'Welcome to PokerZone!',
  text: 'Welcome to PokerZone! This is your validation code: a',
  html: 'Welcome to PokerZone! This is your validation code: a',
};
sgMail.send(msg);
