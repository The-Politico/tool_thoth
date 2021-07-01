# Thoth
![Logo of an Ibis](./docs/media/thoth-token.png)

A form handler with a few interactive tricks up its beak.

## Why This?

Thoth started as a way to handle one specific need in our newsroom: having users fill out a form and logging the results in a spreadsheet. As I built it though, I realized how much "chrome" it needed just to get the basics working, so I decided to make it a bit more flexible. Now, it's a Lambda app for handling all kinds of Slack interactivity (still focussed on "the form" as its central unit).

## API Reference

The API is available and can be reached via it's API gateway URL. You can get that base URL by deploying the app or from the Slack app. I won't be including it here for security purposes. All routes are POST routes which take a JSON body.

### Authentication
Requests will be authenticated one of two ways. The first is through a `token` key in the body of the request. This token should match the `THOTH_API_TOKEN` used in deployment. You can find that value in our Password Manager.

The other authentication is through the signed secret method described on [Slack's official docs](https://api.slack.com/authentication/verifying-requests-from-slack). This method can only be used by Slack and is in place for verifying requests that come from your Slack app. If you are a user trying to trigger an API endpoint, use the first method.

### Endpoints

#### `/bridge/`
This endpoint is used for custom bridge commands. It expects a `command` key in the body indicating which bridge command should be preformed. Each commands might also have their own keys needed in the body as indicated below:
- `headline-test-update`: Trigger an update to be sent to the Slack channel with upcoming requests. Expects a `alertTime` key in the body set to `10` or `22` for the am or pm updates respectively.

#### `/interactivity/`
Used as the endpoint for the app's `Interactivity Request URL`. Handles various input changes and form submissions for items generated by the app.

#### `/slash/`
Used as the endpoint for the app's Slash Commands (all of them). The actual command should come through as a `command` in the body of the request which will be parsed and handled by one of the following command handlers:
- `/headline-test-new`: Triggers a form to create a new headline test
- `/headline-test-edit`: Triggers a form to select an existing headline test to edit
- `/headline-test-all`: Messages the user with information about upcoming headline tests

#### `/test/`
A simple test endpoint. It should respond with `{ok: true}` if the app is set up correctly. This endpoint still requires the authentication listed above.


## Setup

### Setting up your environment

Set up your env by copping `.env.template` as `.env`.

```
$ cp .env.template .env
```

Fill out your AWS credentials. You can also fill in `GOOGLE_HEADLINE_TESTS` with a sheet ID for where you want your headline tests to go and `SLACK_HEADLINE_TEST_CHANNEL` for the Slack channel updates should be messaged to. If it's a private channel make sure you added your app (see next section) to it).

If you're using AWS Parameter Store for credentials that's all you need to do. The three remaining secrets will be loaded in with you AWS credentials. If you're not, make sure to add the following to your environment another way:
- `GOOGLE_SERVICE_ACCOUNT_KEY`: A key for a Google service account
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: The email associated with that Google service account
- `THOTH_API_TOKEN`: This can be any value – you'll use this to authenticate incoming requests to your app
- `THOTH_SLACK_SECRET`: You'll get this in the next section
- `THOTH_SLACK_TOKEN`: You'll get this in the next section

### Setting Up Slack

Before you can use Thoth, you'll need to set up a Slack App you can install in your workspace. Go [here](https://api.slack.com/apps?new_app=1)] to create a new app, or go [here](https://api.slack.com) to find the app if it already exists. You'll need the `Signing Secret` which you can find in `Basic Information`. And you'll need the `Bot User OAuth Token`, which you can find in `OAuth & Permissions`.

Put these in your AWS Parameter Store under `THOTH_SLACK_SECRET` and `THOTH_SLACK_TOKEN` respectively if you're using Parameter Store. Otherwise, just get them into your environment some other way.

### Deploying to Lambda

Set up your terraform secrets by copping `terraform/config/config.tfvars.secret.example` as `config.tfvars.secret`.

```
$ cp ./terraform/config/config.tfvars.secret.example ./terraform/config/config.tfvars.secret
```

Then fill in the values with the environment values discussed above. This will get them into your Lambda app and Events.

If it's your first time deploying this app on this computer run this to set up terraform:
```
$ yarn t-init
```

Then you can run this and follow the instructions:
```
$ yarn ship
```

So what are you deploying exactly?
- `lambda-thoth-api`: A Lambda app that actually processes the requests
- `lambda-thoth-api__api`: An API gateway to route traffic from a URL to the lambda app
- `lambda-thoth-api__ht-am-update`: An AWS Event to automatically trigger the Lambda at 10 UTC (6 am).
- `lambda-thoth-api__ht-pm-update`: An AWS Event to automatically trigger the Lambda at 22 UTC (6 pm).
- Various other policies, permissions, and connections between those four things to get them talking.

## Development

If you want to develop the app, first install dependencies:

```
$ yarn
```

Then start the nodemon to watch and rebuild the codebase:

```
$ yarn dev
```

In another terminal, start the dev server:

```
$ yarn dev-start
```

Finally, start an [ngrok tunnel](https://ngrok.com/) to your dev server:
```
$ ngrok http 8888
```

You can use this ngrok tunnel as the base of your app (see Dev Slack App).

### Development Slack App
It's best to use [this app](https://api.slack.com/apps/A024M68AZPX) for development which lives in [this development Slack workspace](briz-playground.slack.com). If you need access to either, contact Andrew Briz. Set up credentials by copying the `THOTH_SLACK_SECRET`
and `THOTH_SLACK_TOKEN` of this dev app into your environment as described above. Then fill out the following URLs with your ngrok tunnel:
- Setting `Request URL` in `Interactivity & Shortcuts` to `<YOUR_TUNNEL>/interactivity/`
- Setting each slash command in `Slash Commands` to `<YOUR_TUNNEL>/slash/`.

Read more about how the handlers work in our [extended docs]('./docs/slack-apps.md').

## Credits
Logo [iconography](https://thenounproject.com/search/?q=ibis&i=962350) by [parkjisun](https://thenounproject.com/naripuru/) from [The Noun Project](https://thenounproject.com/).