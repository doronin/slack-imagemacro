var bodyParser = require('body-parser'),
    express = require('express'),
    optimist = require('optimist'),
    request = require('request'),
    packageJson = require('./package.json'),
    macros,
    options = optimist.options({
      token: {
        demand: true,
        describe: 'Valid App Token in Slack'
      },
      macros: {
        demand: true,
        describe: 'URL to imagemacros.json'
      },
      port: {
        demand: false,
        default: 3000,
        describe: 'App port'
      }
    }).argv,
    app = express();

if (/^http/.test(options.macros)) {
  request({
    uri: options.macros,
    json: true
  }, function(err, res) {
    if (err) {
      console.log('Failed to download image macros from ' + options.macros);
      process.exit(1);
    }

    macros = res.body;
  });
} else {
  macros = require(options.macros);
}

app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/health', function(req, res) {
  res.json({
    name: packageJson.name,
    version: packageJson.version
  });
});

app.post('/macro', function(req, res) {
  var key,
      uri;

  if (req.body.token !== options.token) {
    return res.status(401).send({
      success: false,
      error: 'Invalid token'
    });
  }

  key = req.body.text;
  uri = macros[key];

  if (!uri) {
    return res.status(404).send({
      success: false,
      error: 'Image macro not found'
    });
  }

  res.json({
    response_type: 'in_channel',
    text: '',
    attachments: [{
      fallback: key + ': ' + uri,
      image_url: uri
    }]
  });
});

app.listen(options.port);
