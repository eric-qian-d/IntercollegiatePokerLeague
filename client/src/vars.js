const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);

module.exports = {
  protocol: 'http',
  serverEndpoint: isProduction ? 'whateverwebsite' : 'localhost',
  port: isProduction ? process.env.PORT  : 8081,
}
