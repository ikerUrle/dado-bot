const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");
const { env } = require("process");

dotenv.config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const tiradaFate = () => {
  var rollResult = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 3 - 1)
  ).reduce((total, num) => total + num);

  return `*Tirada Fate*: **${rollResult}**`;
};

const tiradaDado = (num, dado) => {
  var results = Array();
  for (var i = 0; i < (num != "" ? num : 1); i++) {
    results.push(Math.floor(Math.random() * dado + 1));
  }
  var res = `*Tirada ${num}d${dado}:* `;

  if (num == "") {
    res += ` **${results[0]}**`;
  } else {
    res += `${results.join(" + ")} = **${results.reduce(
      (acc, value) => (acc += value)
    )}**`;
  }
  return res;
};

var enviarTirada = (msg, tirada) => {
  msg.delete();
  msg.channel.send(`*${msg.author}*: ${tirada}`);
};

client.on("message", (msg) => {
  if (msg.content == "tirada" || msg.content == "!") {
    enviarTirada(msg, tiradaFate());
  } else if (msg.content.match("![0-9]{0,1}d[0-9]*")) {
    var values = msg.content.substring(1).split("d");
    enviarTirada(msg, tiradaDado(values[0], values[1]));
  } else if (msg.content == "clear") {
    msg.channel.messages.fetch({ limit: 100 }).then((messages) => {
      msg.channel.bulkDelete(messages);
    });
  }
});

client.login(process.env.BOT_TOKEN);
