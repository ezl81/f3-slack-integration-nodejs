require('dotenv');
const { App, LogLevel } = require("@slack/bolt");
const { registerListeners } = require("./listeners");

const signingSecret = process.env.SLACK_SIGNING_SECRET;
const botToken = process.env.SLACK_BOT_TOKEN;

const app = new App({
  token: botToken,
  signingSecret: signingSecret
});

registerListeners(app);

(async () => {
  //start your app
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app started!');
})();