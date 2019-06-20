const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);

module.exports = {
  protocol: 'http',
  serverEndpoint: isProduction ? 'api.pokerzone.io' : 'localhost',
  port: 8081,
}
