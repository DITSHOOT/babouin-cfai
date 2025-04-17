const Discord = require('discord.js');
const bot = new Discord.Client({ intents: 3276799 });
const config = require('./config');
const express = require('express');
const app = express();
const schedule = require('node-schedule');
const authorizedID = '510818650307952640';

bot.login(config.token);

// Tableau des différentes activités
let status = [
  {
    name: "les pas de Vivasse",
    type: Discord.ActivityType.Listening,
    status: "online",
  },
  {
    name: 'les tours de tables de Vivasse',
    type: Discord.ActivityType.Watching,
    status: "online",
  },
  {
    name: 'compter les pas de Vivasse',
    type: Discord.ActivityType.Playing,
    status: "online",
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
      bot.user.setActivity(status[random].name, { type: status[random].type, url: status[random].url });
      console.log(`Activité mise à jour avec succès : ${status[random].name}`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'activité :', error);
    }
  }, 7200000); // 2 heures en millisecondes

  // Fonction pour envoyer le message
  const sendReminder = async () => {
    const channel = bot.channels.cache.get('1151478201823023214'); // Remplacer par l'ID de votre salon

    if (channel) {
      const embed = new Discord.EmbedBuilder()
        .setColor('#0099ff')
        .setTitle("N'oubliez pas de pousser !")
        .setDescription("Attention Vivasse ne va pas être content, faut pousser !");

      try {
        // Envoyer l'embed
        // await channel.send({ embeds: [embed] });
        // console.log("Embed envoyé !");

        // Envoyer le message en plus de l'embed
        await channel.send("<@&1192744421201035374>");
        console.log('Rappel pour pousser sur Git envoyé !');
      } catch (error) {
        console.error('Erreur lors de l\'envoi du rappel :', error);
      }
    } else {
      console.error('Le salon spécifié est introuvable.');
    }
  };

  // Planifier les messages à 10h et 15h chaque jour
  // schedule.scheduleJob('0 10 * * 1-5', sendReminder); // À 10h du lundi au vendredi
  // schedule.scheduleJob('0 15 * * 1-5', sendReminder); // À 15h du lundi au vendredi
});

bot.on('messageCreate', (message) => {
  if (message.content.startsWith(config.prefix + 'erreur') && message.author.id === authorizedID) {
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
  if (message.content.startsWith(config.prefix + 'reload') && message.author.id === authorizedID) {
    message.delete();
    console.log("Redémarrage du bot en cours...");
    await message.channel.send("Redémarrage du bot en cours...");
    process.exit();
  }
});


bot.on('messageCreate', async (message) => {
  if (message.content === '!reload' && message.author.id === "510818650307952640") {
    await message.delete();
    console.log("Redémarrage du bot en cours...");
    await message.channel.send("Redémarrage du bot en cours...");
    process.exit();
  }
});

bot.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ne répondez pas aux messages des bots
  if (!message.content.startsWith(config.prefix)) return; // Vérifiez s'il commence par le préfixe

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'say') {
    // Vérifiez si l'utilisateur est un administrateur
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('Seuls les administrateurs sont autorisés à utiliser cette commande.');
    }

    // Supprime la commande de l'utilisateur
    message.delete();

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

