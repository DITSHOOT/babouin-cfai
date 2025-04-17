const Discord = require('discord.js');
const bot = new Discord.Client({ intents: 3276799 });
const config = require('./config');
const express = require('express');
const app = express();
const authorizedID = ['510818650307952640'];
// const PORT = process.env.PORT || 3000;

bot.login(config.token);

// Tableau des différentes activités
let status = [
  {
    name: "Grand Theft Auto VI",
    type: Discord.ActivityType.Playing,
    //status: "dnd",
  },
  {
    name: 'du Popcorn 🍿',
    type: Discord.ActivityType.Watching,
    //status: "online",
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

bot.on('messageCreate', async (message) => {

  if (message.content === '!reload' && message.author.id === "510818650307952640") {
    await message.delete();
    console.log("Redémarrage du bot en cours...");
    await message.channel.send("Redémarrage du bot en cours...");
    process.exit();
  }
});

bot.on('messageCreate', async (message) => {

    if (message.content.startsWith(config.prefix + 'year')) {
        // Création de l'embed
        const embed = new Discord.EmbedBuilder()
            .setTitle('📅 Résumé de notre année en BTS SIO')
            .setDescription("Babouins, cette première année de BTS est déjà terminée, le temps n'est pas passé super rapidement en vrai ? Nous avons passé tellement d'épreuves INSURMONTABLES (c'est faux, c'était facile), mais nous ne devons pas nous reposer sur nos lauriers de bananier. La deuxième année risque d'être rude de par les nombreuses épreuves qu'elle nous prépare et surtout, cela veut dire que toutes les notions de la première année doivent être acquises. C'est pourquoi, \n\nL'équipe <@&1259128095416254484>, vous encourage à faire vos pull requests, à designer le site, ou à poursuivre tout autre aspect du projet qui vous inspire. Imaginez, plus de secret, tout sera sur notre sein, suprême site web [Docs - Babouins](https://docs.babouins.fr).\n\nSi vous voulez jeter un coup d'œil sur les épreuves de l'année prochaine, les voici :\n\n- Portfolio - Présentation Entreprise/Missions/Veille Technologique.. ([Exemple](https://plotton.alphaprimo.fr/) & [Info](https://www.h3hitema.fr/2022/01/24/cest-quoi-un-portfolio-en-bts-sio/))\n- Le reste, ça sera l'année prochaine. Reposez-vous, jouez à LOL ou à Valorant bande de fous, prenez des vacances, travaillez bien en entreprise, donnez tout, profitez, jusqu'au 2 Septembre prochain <:sarh_quel_plaisir:1259140197669535796>\n\nDe plus, voici un fichier Excel qui pourrait vous aider à utiliser votre temps libre pour progresser et devenir de véritables experts. Ce fichier a été compilé par notre maître, inspiré par la [vidéo](https://www.youtube.com/watch?v=tANTikGADA8) qui a été envoyée par <@220285497552011264>")

            .setColor("#6d5050")
            .setAuthor({
                name: `${bot.user.username}`,
                iconURL: `${bot.user.displayAvatarURL()}`
            })
            .setFooter({
                text: `${message.guild.name} - ${new Date().toLocaleString()}`,
                iconURL: message.guild.iconURL({ dynamic: true, format: 'png', size: 1024 })
            });
        // Envoi de l'embed dans le canal où la commande a été utilisée
		const sentEmbed = await message.channel.send({ embeds: [embed] });


        // Envoi du fichier Excel
        const excelFile = './kind_cop-main/src/Objectif_reseaux.xlsx'; // Spécifiez le chemin vers votre fichier Excel
        await message.channel.send({ files: [excelFile] }); // Envoie le fichier Excel après l'embed
		await message.channel.send("<@&1151420412161441835>").catch(console.error);
		await message.channel.send("<@&1151420685953015858>").catch(console.error);

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

