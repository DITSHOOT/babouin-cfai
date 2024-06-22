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

  // Changer l'activité toutes les 2 heures
  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    bot.user.setActivity(status[random].name, { type: status[random].type })
      .then(presence => console.log(`Activité mise à jour avec succès : ${presence.activities[0].name}`))
      .catch(console.error);
  }, 2 * 60 * 60 * 1000); // 2 heures en millisecondes

  // Définir l'intervalle pour vérifier l'heure et le jour
  setInterval(() => {
    const date = new Date();
    const dayOfWeek = date.getDay(); // 0 pour dimanche, 1 pour lundi, ..., 6 pour samedi
    const hour = date.getHours();

    // Vérifier que ce n'est pas le weekend (jours 0 et 6)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Vérifier l'heure
      if (hour === 10 || hour === 14 || hour === 18) {
        const channel = client.channels.cache.get('1163902591768477776'); // Remplacer par l'ID de votre salon

        if (channel) {
          const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Titre de l\'embed')
            .setDescription('Contenu de l\'embed');

          channel.send(embed)
            .then(() => console.log('Embed envoyé avec succès'))
            .catch(console.error);
        } else {
          console.error('Le salon spécifié est introuvable.');
        }
      }
    }
  }, 60 * 1000); // Vérification toutes les minutes
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



// Au lieu d'utiliser setTimeout, j'utilise setInterval. setInterval permet d'exécuter une fonction à intervalles réguliers, tandis que setTimeout ne l'exécute qu'une seule fois (évite l'envoi de plein de message à la foi). Cela permet d'éviter de réinitialiser la temporisation à chaque message créé.

// Stockage de l'identifiant de l'intervalle : J'ai ajouté une variable reminderInterval pour stocker l'identifiant de l'intervalle créé par setInterval. Cela nous permet de le manipuler plus tard, notamment pour l'arrêter lorsque l'envoi de l'embed est désactivé.
