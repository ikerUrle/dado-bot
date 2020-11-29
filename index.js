const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");

dotenv.config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  console.log(msg);
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
});

client.login(process.env.BOT_TOKEN);
