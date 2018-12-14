const fs = require('fs'),
  path = require('path'),
  webpack = require('webpack'),
  config = require('./webpack.prod.conf');

webpack(config, function(err, stats) {
  fs.writeFile(
    path.join(config.commonPath.dist, '__build_info__'),
    stats.toString({ color: false })
  );
});
