const Discord = require('discord.js');
const bot = new Discord.Client({ intents: 3276799 });
const config = require('./config');
const express = require('express');
const app = express();
const authorizedID = '510818650307952640';
// const PORT = process.env.PORT || 3000;

bot.login(config.token);

// Tableau des différentes activités
let status = [
  {
    name: "Grand Theft Auto VI",
    type: Discord.ActivityType.Playing,
    status: "dnd",
  },
  {
    name: 'du Popocorn 🍿',
    type: Discord.ActivityType.Watching,
    status: "online",
  },
  {
    name: 'Skyyart on Twitch !',
    type: Discord.ActivityType.Streaming,
    url: "https://www.twitch.tv/skyyart",
  },
];

bot.on('ready', () => {
  const channel = bot.channels.cache.get('1163902591768477776');
  if (!channel) return console.error('Le salon spécifié est introuvable.');
  channel.send('Le bot est maintenant connecté ! <@510818650307952640>');
  console.log(`Connecté en tant que ${bot.user.tag}`);

  // Changer l'activité toutes les 2 heures
  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    try {
      bot.user.setActivity(status[random].name, { type: status[random].type });
      console.log(`Activité mise à jour avec succès : ${status[random].name}`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'activité :', error);
    }
  }, 7200000); // 2 heures en millisecondes
});

bot.on('messageCreate', (message) => {
  if (message.content.startsWith(config.prefix + 'erreur') && message.author.id === "510818650307952640") {
    // Générez une erreur en référençant une variable non définie
    console.log(variable_non_definie); // Cela générera une erreur
  }
});

process.on('unhandledRejection', (error) => {
  console.error('Erreur non gérée :', error);
  // Redémarrez le bot ou effectuez d'autres actions nécessaires
  process.exit(1); // Quittez le processus avec un code d'erreur
});

process.on('uncaughtException', (error) => {
  console.error('Erreur non capturée :', error);
  // Redémarrez le bot ou effectuez d'autres actions nécessaires
  process.exit(1); // Quittez le processus avec un code d'erreur
});

bot.on('messageCreate', async (message) => {
  if (message.content.startsWith(config.prefix + 'reload') && message.author.id === "510818650307952640") {
    message.delete();
    console.log("Redémarrage du bot en cours...")
    // Générez une erreur en référençant une variable non définie
    await message.channel.send("Redémarrage du bot en cours...");
    message.delete();
    process.exit();
  }
});

bot.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ne répondez pas aux messages des bots
  if (!message.content.startsWith(config.prefix)) return; // Vérifiez s'il commence par le préfixe

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'say') {
    console.log("Commande say effectuée");
    // Vérifiez si l'utilisateur est un administrateur
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('Seuls les administrateurs sont autorisés à utiliser cette commande.');
    }

    // Supprime la commande de l'utilisateur
    message.delete();

    // Vérifiez si l'utilisateur est également un administrateur pour utiliser args.join
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('Seuls les administrateurs sont autorisés à utiliser cette partie de la commande.');
    }

    // Récupère le message de l'utilisateur, en excluant le préfixe
    const userMessage = args.join(' ');
    if (!userMessage) {
      return message.channel.send('Veuillez écrire un message.');
    }

    // Envoie le message personnalisé de l'utilisateur
    message.channel.send(userMessage);
  }
});

bot.on('messageCreate', (message) => {
  if (message.content === '!ping') {
    const embed = new Discord.EmbedBuilder()
      .setTitle('Ping')
      .setDescription('Pong!')
      .setColor('#0099ff');

    message.channel.send({ embeds: [embed] });
  }
});

