# slack-imagemacro

Slack Bot that shows image macros

`/macro` for slack.

## Usage

`/macro suchdiff`
![suchdiff image macro](http://i.imgur.com/K2Y97yi.png)

## Setup
First you need to create *imagemacros* JSON file in the following format:

```
{
  "<image-macro-name>": "<image-url>",
  ..
}
```

Example:
```
{
  "imagemacro-name": "http://example.com/images/imagemacro-name.png",
  "suchdiff": "http://example.com/images/suchdiff.gif"
}
```

If you have image macros in Phabricator you can export them as *imagemacros* file by running `bin/export > imagemacros.json` which will create `imagemacros.json` file with data in correct format. `bin/export` script requires you to have [https://github.com/phacility/arcanist](arcanist) and [https://stedolan.github.io/jq](jq) installed.

Optionally you may want to upload *imagemacro* file as well as images to s3. You can do that by running `bin/export | bin/sync -b <s3-bucket> -p <key-prefix> -i <path-to-imagemacros-json>`.

### Slash Command

Create a Slash Command called /macro, set the method to POST and point the
URL to:

https://your-slack-imagemacro-instance.example.com/macro

### Server

Run the *slack-imagemacro* server with your Slack Command token and *imagemacros* URL or path to *imagemacros* file:

```
$ node server.js --token=<token> --macros https://s3.amazonaws.com/my-s3-bucket/macros/imagemacros.json

$ node server.js --token=<token> --macros ./path-to-imagemacros.json
```
