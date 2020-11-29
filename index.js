const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");

dotenv.config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var rollMsgs = { "-4": "R.I.P", 0: "mediocre...", 4: "YEAH BABY" };
const tiradaFate = () => {
  var rollResult = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 3 - 1)
  ).reduce((total, num) => total + num);

  return `${rollResult} ${rollMsgs[rollResult] || ""}`;
};

client.on("message", (msg) => {
  if (msg.content == "tirada" || msg.content == "!") {
    msg.delete();
    msg.channel.send(`${msg.author}: ${tiradaFate()}`);
  } else if (msg.content == "clear") {
    msg.channel.messages.fetch({ limit: 100 }).then((messages) => {
      msg.channel.bulkDelete(messages);
    });
  }
});

client.login(process.env.BOT_TOKEN);
