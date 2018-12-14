let express = require('express'),
  webpack = require('webpack'),
  // favicon = require('express-favicon'),
  config = require('./webpack.dev.conf'),
  app = express();
let compiler = webpack(config);
app.use('/static', express.static(config.commonPath.staticDir));
// app.use(favicon(path.join(__dirname, '../favicon.ico')));
app.use(require('connect-history-api-fallback')());
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.listen(9000, '0.0.0.0', function(err) {
  err && console.log(err);
});
