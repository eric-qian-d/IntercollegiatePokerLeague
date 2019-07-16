const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  protocol: isProduction ? 'https' : 'http',
  serverEndpoint: isProduction ? 'api.pokerzone.io' : 'localhost',
  port: isProduction ? '' : 8081,
}
