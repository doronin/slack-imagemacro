# slack-imagemacro

Slack Bot that shows image macros

`/macro` for slack.

## Usage

`/macro suchdiff`
![suchdiff image macro](http://i.imgur.com/K2Y97yi.png)

## Setup
First you need to export image macros from Phabricator and make them available to `slack-imagemacro` as public URL to JSON file in the following format:

```
{
    "imagemacro-name": {
        "uri": "http://example.com/images/imagemacro-name.png"
    },
    "suchdiff": {
        "uri": "http://example.com/images/suchdiff.gif"
    }
}
```

If you have [https://github.com/phacility/arcanist](arcanist) and [https://stedolan.github.io/jq](jq) installed you can run `npm run import` which will create `imagemacros.json` file that has data in correct format.

### Slash Command

Create a Slash Command called /macro, set the method to POST and point the
URL to:

https://your-slack-imagemacro-instance.example.com/macro

### Server

Run the slack-imagemacro server with your Slack Command token and imagemacro URL:

`$ node server.js --token=<token> --macros https://example.com/macros.json`
