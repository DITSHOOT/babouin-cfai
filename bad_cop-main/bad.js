const Discord = require('discord.js');
const bot = new Discord.Client({intents: 3276799})
const config = require('./config')
const express = require('express');
const app = express();
const authorizedID = '510818650307952640';
//const PORT = process.env.PORT || 3000;

bot.login(config.token)


// Tableau des différentes activités

let status = [
  {
    name: "Let's Groove - Earth, Wind & Fire",
    type: Discord.ActivityType.Listening,
    status: "dnd",
  },
  {
    name: 'Beverly Hills Cop',
    type: Discord.ActivityType.Watching,
    status: "dnd",
  },
  {
    name: 'DTR - 7 Décembre à 19h',
    type: Discord.ActivityType.Streaming,
    url: "https://dtrfight.fr/boxeurs/billy/",
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
});

// Salon MEME-CFAI
bot.on('messageCreate', (message) => {
  const channelIDMEME = "1204073066125336626";
  // console.log(`Tentative d'envoi de message de ${message.author.tag}`);
  if (message.author.bot) return; // Ignorer les messages des bots
  if (message.channel.id === channelIDMEME && message.content && !message.attachments.size) {
    // Si le message est dans le salon spécifique, contient du texte, mais n'a pas d'attachements (images)
    message.delete();

    const channelMention = message.channel.toString();
    
    const embed = new Discord.EmbedBuilder()
      .setColor('#FF5733')
      .setTitle(`<a:rappel:1185911636565954620> ${channelMention}<a:rappel:1185911636565954620>`)
      .setDescription("<a:no_cfai:1204156980130746478> **Interdiction d'envoyer des messages**. <a:no_cfai:1204156980130746478>\n\n" +
                      "<:check_cfai:1204157780534235217> Envoyer uniquement des **fichiers** !")
      .setThumbnail('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNW41Y3N2M3gwOTZtY2VwYm13dXR5bTA4dXkxNmcxbDE5c3IycXNuMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cIVzLZ6TioCVXvhZdV/source.gif');

    message.author.send({ embeds: [embed] });
  }
});

bot.on('messageCreate', (message) => {
  if (message.content.startsWith(config.prefix + 'erreur') && message.author.id === "510818650307952640") {
    try {
      // Générez une erreur en référençant une variable non définie
      console.log(variable_non_definie); // Cela générera une erreur
    } catch (error) {
      console.error(error);
      message.channel.send(`Une erreur s'est produite : ${error}`);
    }
  }
})


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

//bot.on('messageCreate', async message => { // Use 'messageCreate' instead of 'message'
  //if (message.author.id === "264867653271814144") {
  //console.log("Envoi d'un message du JO sûrement inutile")
    //try {
	  //await message.react("<a:okcool:1246508566622503055>");
    //} catch (error) {
      //console.error('Une erreur est survenue lors de l\'ajout de la réaction :', error);
	//}
  //}
//});


bot.on('messageDelete', async (message) => {
// Liste des IDs à ignorer
const idsAIgnore = new Set(["1164281177503453295","1162806635740270662","1174806474543878154","1192417992735211550"]);
// bad ; kind ; philo ; push
    // Vérifier si l'auteur du message est un bot ou si son ID est dans la liste des IDs à ignorer
    if (message.author.bot || idsAIgnore.has(message.author.id)) {
        return;
    }

    // Récupérer le salon avec son ID
    const logChannelId = '1163440574548951142';
    const logChannel = message.guild.channels.cache.get(logChannelId);

    // Vérifier si le salon existe
    if (!logChannel) {
        console.log(`Le salon avec l'ID ${logChannelId} n'existe pas ! (delete)`);
        return;
    }

    // Créer l'embed
    const embed = new Discord.EmbedBuilder()
        .setTitle('Message supprimé')
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
        .setDescription(`**Salon :** <#${message.channel.id}>\n\n**Message :**\n${message.content || 'Pas de contenu'}`)
        .setColor('#099EF9')
        .setTimestamp()
        .setFooter({ text: `Utilisateur : ${message.author.tag} | ID : ${message.author.id}`, iconURL: message.author.displayAvatarURL() });

    // Envoyer l'embed dans le salon
    logChannel.send({ embeds: [embed] }).catch(console.error);
});

// Fonction pour nettoyer le contenu d'un message en retirant les liens
function cleanContent(content) {
  return content.replace(/https?:\/\/\S+/g, '');
}

bot.on('messageUpdate', async (oldMessage, newMessage) => {
  // Ignorer les messages modifiés par des bots ou les messages sans contenu
  if (oldMessage.author.bot || !oldMessage.content || !newMessage.content) return;

  // Nettoyer le contenu des anciens et nouveaux messages
  const cleanedOldContent = cleanContent(oldMessage.content);
  const cleanedNewContent = cleanContent(newMessage.content);

  // Si le contenu nettoyé est identique, on ignore la mise à jour
  if (cleanedOldContent === cleanedNewContent) return;

  // Récupérer le salon avec son ID
  const logChannelId = '1163440574548951142';
  const logChannel = oldMessage.guild.channels.cache.get(logChannelId);

  // Vérifier si le salon existe
  if (!logChannel) return console.log(`Le salon avec l'ID ${logChannelId} n'existe pas ! (edit)`);

  // Créer l'embed
  const embed = new Discord.EmbedBuilder()
    .setTitle('Message modifié')
    .setAuthor({ name: oldMessage.author.username, iconURL: oldMessage.author.displayAvatarURL() })
    .setDescription(`**Salon :** <#${oldMessage.channel.id}>\n\n**Avant :**\n${oldMessage.content}\n\n**Après :**\n${newMessage.content}`)
    .setColor('#099EF9')
    .setTimestamp()
    .setFooter({ text: `Utilisateur : ${oldMessage.author.tag} | ID : ${oldMessage.author.id}`, iconURL: oldMessage.author.displayAvatarURL() });

  // Envoyer l'embed dans le salon
  logChannel.send({ embeds: [embed] }).catch(console.error);
});

bot.on('messageCreate', async message => {
    if (message.content.startsWith(config.prefix + 'profil')) {
        let user = message.author;
        const mention = message.mentions.users.first();

        if (mention) {
            user = mention;
        }

        try {
            const fetchedUser = await bot.users.fetch(user.id, { force: true });
            const avatarURL = fetchedUser.displayAvatarURL({ dynamic: true, size: 2048 });
            const bannerURL = fetchedUser.bannerURL({ dynamic: true, size: 2048 });

            let responseMessage = `${user} voici ton [avatar](${avatarURL}) :`;
            if (bannerURL) {
                responseMessage += `\nEt ta [bannière](${bannerURL}) Discord :`;
            } else {
                responseMessage += "\n(*Rip, tu ne possède pas de bannière Discord ;-;.*)";
            }

            message.channel.send(responseMessage);
        } catch (error) {
            console.error('Erreur lors de la récupération des informations:', error);
            message.channel.send('Désolé, une erreur est survenue lors de la récupération des informations.');
        }
    }
});




bot.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignorer les messages des bots

  // Vérifier si le message commence par le préfixe et l'utilisateur a la permission de gérer les messages
  if (message.content.startsWith(config.prefix)) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'clear') {
	message.delete();
      // Vérifier si un nombre d'arguments a été fourni
      if (!args.length) {
        return message.reply('Veuillez spécifier le nombre de messages à supprimer.');
      }

      // Convertir le nombre d'arguments en un nombre entier
      const amount = parseInt(args[0]);

      // Vérifier si "amount" est un nombre valide
      if (isNaN(amount) || amount <= 0 || amount > 100) {
        return message.reply('Veuillez spécifier un nombre entre 1 et 100.');
      }

            // Supprimer les messages
            message.channel.bulkDelete(amount)
            .then(() => {
              message.channel.send(`<:cfai_pikasmirk:1163457620200394833> ***__${amount}__*** ***messages ont été supprimés.***`)
                .then((msg) => {
                  // Supprimer le message après 5 secondes
                  setTimeout(() => {
                    msg.delete();
                  }, 5000);
                });
            })
        .catch((error) => {
          console.error(error);
          message.channel.send(`Une erreur s'est produite : ${error}`);
        });
    }
  }
});


bot.on('messageCreate', async message => {
    if (!message.guild) return;

    if (message.content.startsWith(config.prefix + 'mute')) {
        if (message.author.id !== config.authorizedID) {
            return message.reply('Vous n\'êtes pas autorisé à utiliser cette commande.');
        }

        const args = message.content.split(' ');
        const user = message.mentions.members.first();
        let duration = args[2];
        const reason = args.slice(3).join(' ');

        if (!user || !duration || !reason) {
            return message.reply(`Hé, hey ! Pour muter un babouin, utilise : **${config.prefix}mute** @babouin **{seconde ou heure}** **{raison}**.`);
        }

        let seconds;
        if (duration.toLowerCase().includes('h')) {
            const hours = parseFloat(duration);
            if (isNaN(hours)) {
                return message.reply(`Pour les heures, tu dois spécifier un nombre, pas de bêtises ! Usage : **${config.prefix}mute** @babouin **{seconde ou heure}** **{raison}**.`);
            }
            seconds = hours * 3600;
        } else {
            seconds = parseInt(duration);
            if (isNaN(seconds)) {
                return message.reply(`Hé, hé ! Pas de durée, pas de mute ! Usage : **${config.prefix}mute** @babouin **{seconde ou heure}** **{raison}**.`);
            }
        }

        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    name: 'Muted',
                    permissions: []
                });
                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.permissionOverwrites.create(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (error) {
                console.log(error);
                return message.reply('Erreur en créant le rôle Muted... Babouin est en colère !');
            }
        }

        try {
            await user.roles.add(muteRole);
            const hours = seconds / 3600;
            const replyMessage = await message.reply(`Ah, ah ! ${user} est dans la cage pendant **${hours.toFixed(2)}** heures (**${seconds}** secondes). **Motif** : __${reason}__.`);
            // Supprimer le message original après 5 secondes (5000 ms)
            message.delete({ timeout: 5000 }).catch(console.error);

            // Création de l'embed pour les logs de mute
            const logEmbed = new Discord.EmbedBuilder()
                .setColor('#099EF9')
                .setTitle('Babouin a muté')
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                .setDescription(`Hé, hé ! ${user} est dans la cage !`)
                .addFields(
                    { name: 'Babouin', value: user.user.tag, inline: true },
                    { name: 'Durée', value: `${hours.toFixed(2)} heures (${seconds} secondes)`, inline: true },
                    { name: 'Motif', value: reason }
                )
                .setTimestamp()
                .setFooter({ text: `Babouin : ${user.user.tag} | ID : ${user.user.id}`, iconURL: user.user.displayAvatarURL() });

            // Enregistrement des logs dans un canal dédié
            const logChannelId = '1163440574548951142';
            const logChannel = message.guild.channels.cache.get(logChannelId);
            if (logChannel) {
                logChannel.send({ embeds: [logEmbed] });
            }

            // Unmute automatique après la durée spécifiée
            setTimeout(async () => {
                if (user.roles.cache.has(muteRole.id)) {
                    await user.roles.remove(muteRole);
                    message.channel.send(`Libération de ${user} !`);

                    // Création de l'embed pour les logs de unmute
                    const unmuteEmbed = new Discord.EmbedBuilder()
                        .setColor('#099EF9')
                        .setTitle('Babouin a libéré')
                        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                        .setDescription(`Ah, ah ! ${user} est libre !`)
                        .addFields(
                            { name: 'Babouin', value: user.user.tag, inline: true }
                        )
                        .setTimestamp()
                        .setFooter({ text: `Babouin : ${user.user.tag} | ID : ${user.user.id}`, iconURL: user.user.displayAvatarURL() });

                    // Enregistrement des logs de unmute dans un canal dédié
                    if (logChannel) {
                        logChannel.send({ embeds: [unmuteEmbed] });
                    }
                }
            }, seconds * 1000);
        } catch (error) {
            console.error(error);
            message.reply('Erreur en mutant le babouin... Babouin est très fâché !');
        }
    }

    // Commande de unmute
    if (message.content.startsWith(config.prefix + 'unmute')) {
        if (message.author.id !== config.authorizedID) {
            return message.reply('Vous n\'êtes pas autorisé à utiliser cette commande.');
        }

        const user = message.mentions.members.first();

        if (!user) {
            return message.reply(`Hé, hé ! Pour libérer le babouin, utilise : **${config.prefix}unmute** @babouin.`);
        }
        // Supprimer le message original après 5 secondes (5000 ms)
        message.delete({ timeout: 5000 }).catch(console.error);

        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (muteRole && user.roles.cache.has(muteRole.id)) {
            try {
                await user.roles.remove(muteRole);
                const replyMessage = await message.reply(`Libération de ${user} !`);
                message.delete({ timeout: 5000 }).catch(console.error);

                // Création de l'embed pour les logs de unmute
                const unmuteEmbed = new Discord.EmbedBuilder()
                    .setColor('#099EF9')
                    .setTitle('Babouin a libéré')
                    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                    .setDescription(`Ah, ah ! ${user} est libre !`)
                    .addFields(
                        { name: 'Babouin', value: user.user.tag, inline: true }
                    )
                    .setTimestamp()
                    .setFooter({ text: `Babouin : ${user.user.tag} | ID : ${user.user.id}`, iconURL: user.user.displayAvatarURL() });

                // Enregistrement des logs de unmute dans un canal dédié
                const logChannelId = '1163440574548951142';
                const logChannel = message.guild.channels.cache.get(logChannelId);
                if (logChannel) {
                    logChannel.send({ embeds: [unmuteEmbed] });
                }
            } catch (error) {
                console.error(error);
                message.reply('Erreur en libérant le babouin... Babouin est très fâché !');
            }
        } else {
            message.reply(`${user} n'est pas en cage, hé, hé ! Du moins pas encore U.U`);
        }
        // Supprimer le message original après 5 secondes (5000 ms)
        message.delete({ timeout: 5000 }).catch(console.error);
    }
});

bot.on('messageCreate', async (message) => {
  if (message.content.startsWith(config.prefix + 'annonce')) {
	    if (message.author.id !== authorizedID) {
            return message.reply('Vous n\'êtes pas autorisé à utiliser cette commande.');
        }

    message.delete(); // suppression du message direct

    const reminderEmbed = new Discord.EmbedBuilder()
    .setTitle('<:cfai_hellochristmas:1163457612390608908> Bon Réveillon les Babouins ! <:cfai_hellochristmas:1163457612390608908>')
    .setDescription(
      "**ÉCOUTEZ-MOI BIEN, LES BABOUINS !**\n"
      + "C'est le moment de briller, de faire péter la vibe et de passer le meilleur réveillon de votre vie ! <a:booooooooooom:1188517382650609704>\n\n"
      + "On ne veut que des sourires, des rires, et de la folie !\nPréparez-vous à vivre une soirée **MÉ-MO-RA-BLE**, parce qu'on est les **ROIS** de cette année qui arrive. <:goit:1188516742817927299>\n\n"
      + "Alors, secouez-vous, enfilez vos plus beaux habits de fête, et préparez-vous à **DOMINER 2024** comme jamais et manger tel de vrais babouins ! <a:vibes_cfai:1188518067131650078>\n\n"
      + "<a:staarrrrssss_cfai:1188517698473304224> **JOYEUX RÉVEILLON, BANDE DE CHAMPIONS !** <a:staarrrrssss_cfai:1188517698473304224>"
  )
    .setColor('#FF5733') // Couleur orange énergique
    .setImage('https://media.giphy.com/media/HBMCmtsPEUShG/giphy.gif')
    .setFooter({
      text: `${message.guild.name} - ${new Date().toLocaleString()}`,
      iconURL: message.guild.iconURL({ dynamic: true, format: 'png', size: 1024 })
    });

  // Ensuite, vous pouvez envoyer cet embed dans un canal spécifique :
  await message.channel.send({ embeds: [reminderEmbed] });
  message.channel.send('@everyone');
}
});



bot.on('guildMemberAdd', member => {
  let embed = new Discord.EmbedBuilder()
    .setDescription(`Écoute-moi bien, ${member} ! T'as atterri sur le Discord de la classe **BTS SIO Grp1-Grp2**, là où la réussite t'attend au tournant. Accroche-toi bien, petit génie, et que la chance soit avec toi, ou tu vas en avoir besoin, espèce de novice ! <a:dance_cop:1164284513417953420>`)
      // Ajoutez l'URL de l'icône ici si nécessaire
    .setColor('#099EF9')
    .setImage('https://media.tenor.com/GG3uY-0YauYAAAAC/wink-eddie-murphy.gif')
    .setTimestamp();


  // Remplacez 'ID_DU_CANAL' par l'ID du canal où vous souhaitez envoyer le message.
  const channel = member.guild.channels.cache.get('1163482473880092692');
  //   const channel = member.guild.channels.cache.find(ch => ch.name === '🎉-accueil-🤝');

  if (channel) {
    channel.send({ embeds: [embed] });
  }
});



const vilainsMots = ['putain', 'ta mere', 'ta mère', 'pute', 'fdp', 'fils de pute']; // Ajoutez ici la liste de mots que vous souhaitez détecter

const phrasesReponses = [
  "Hé, mec, t'as cru quoi ? T'as pas d'impunité ici. Les règles sont strictes, et ça, ça passera pas. C'est clair ?",
  "Hey, on est pas en train de jouer à cache-cache ici. Si tu cherches à contourner la loi, tu vas vite déchanter, parce que ça, ça passera pas. Capiche ?",
  "Mon pote, tu peux pas faire n'importe quoi dans ce coin. On est vigilants, et si tu crois que ça, ça passera pas, tu te fourres le doigt dans l'œil. Fais gaffe à toi.",
  "Alors, t'as cru que t'étais au-dessus des lois, hein ? Non, non, non, ici, ça, ça passera pas, que t'en sois bien conscient. On veille au grain, mec.",
  "Hé, écoute-moi bien, mon pote. On peut faire des conneries dans ce quartier, ouais, mais faut pas croire que ça, ça passera pas. Les règles sont claires ici, et on veille au grain. Alors, t'as deux choix : tu te tiens à carreau et tu respectes les lois, ou bien tu vas goûter à la justice du quartier. Et je peux te garantir que ça, ça passera pas. Alors, à toi de voir comment tu veux jouer ton coup, mec."
];

bot.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignorer les messages des bots
  const messageContent = message.content.toLowerCase(); // Convertir le message en minuscules pour une correspondance insensible à la casse

  for (const vilainMot of vilainsMots) {
    if (messageContent.includes(vilainMot)) {
      // Si le message contient un mot inapproprié
      const reponseAleatoire = phrasesReponses[Math.floor(Math.random() * phrasesReponses.length)];
      message.reply(reponseAleatoire);
      break; // Arrêter la boucle après avoir trouvé un mot inapproprié
    }
  }
});




bot.on('messageCreate', async message => {
  if (!message.guild) return;
  if (message.author.bot) return; // Ne répondez pas aux messages des bots
  if (!message.content.startsWith(config.prefix)) return; // Vérifiez s'il commence par le préfixe

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'say') {
    if (message.author.id !== authorizedID) {
      return message.reply('Vous n\'êtes pas autorisé à utiliser cette commande.');
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
  } else if (command === 'kick') {
    if (message.author.id !== authorizedID) {
      return message.reply('Vous n\'êtes pas autorisé à utiliser cette commande.');
    }

    const member = message.mentions.members.first();
    if (!member) {
      return message.channel.send('Veuillez mentionner un membre à kicker.');
	  message.delete(5000);
    }

    const reason = args.slice(1).join(' ');
    if (!reason) {
      return message.channel.send('Veuillez spécifier une raison pour le kick.');
	  message.delete(5000);
    }
	

    member.kick(reason)
      .then((kickedMember) => {
		const kickEmbed = {
		  color: 0x099EF9, // Couleur orange pour un ton amusant
		  title: `🐵 Exclusion de Babouin 🐵`,
		  description: `${kickedMember.user.tag} a été kick avec succès !`,
		  fields: [
			{ name: 'Babouin expulsé', value: kickedMember.user.tag },
			{ name: 'Raison de l\'expulsion', value: reason },
			{ name: '🍌 Niveau de nuisance', value: 'Extrême' },
		  ],
		  thumbnail: {
			url: "https://cdn.discordapp.com/attachments/1163902591768477776/1254087255728062594/enzo.png?ex=66783745&is=6676e5c5&hm=280038d7fc87b246fd8343a38e7afd98d999625c18d8955726ed069b995eb359&", // Insérez ici l'URL d'une image de babouin
		  },
		  timestamp: new Date(),
		  footer: {
			text: `Expulsé par ${message.author.tag}`,
			icon_url: message.author.displayAvatarURL({ dynamic: true }),
		  },
		};

        // Enregistrement des logs dans un canal dédié
        const logChannelId = '1163440574548951142'; // ID du canal de logs
        const logChannel = message.guild.channels.cache.get(logChannelId);
        if (logChannel) {
          logChannel.send({ embeds: [kickEmbed] });
        } else {
          console.log(`Le canal de logs avec l'ID ${logChannelId} n'a pas été trouvé.`);
        }
		// Envoi de l'embed dans le salon où la commande a été utilisée
		message.channel.send({ embeds: [kickEmbed] });

        // Supprimer le message original après 5 secondes (5000 ms)
        message.delete({ timeout: 5000 }).catch(console.error);
      })
      .catch((error) => {
        console.error(error);
        message.channel.send('Une erreur s\'est produite lors du kick du membre.');
      });
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
