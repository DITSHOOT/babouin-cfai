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
<<<<<<< HEAD
    name: "les bruits de shakespeare",
    type: Discord.ActivityType.Listening,
  },
  {
    name: 'à travers le verre, trouve la sagesse au fond de la bouteille :)"',
    type: Discord.ActivityType.Watching,
  },
  {
    name: "deviner dans chaque verre l'énigme de l'âme",
=======
    name: "les murmures de l'univers",
    type: Discord.ActivityType.Listening,
  },
  {
    name: "l'action amène à la motivation, et non l'inverse.",
    type: Discord.ActivityType.Watching,
  },
  {
    name: "peindre ses rêves sur la toile de la réalité",
>>>>>>> 2d1f914 (test)
    type: Discord.ActivityType.Playing,
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
<<<<<<< HEAD
=======
  if (message.content === '!reload' && message.author.id === "510818650307952640") {
    await message.delete();
    console.log("Redémarrage du bot en cours...");
    await message.channel.send("Redémarrage du bot en cours...");
    process.exit();
  }
});


bot.on('messageCreate', async (message) => {
>>>>>>> 2d1f914 (test)
  if (message.content.startsWith(config.prefix + 'annonce')) {
    message.delete(); // suppression du message direct

    const embed = new Discord.EmbedBuilder()
      .setTitle("░▒▓█ CITATION du 06/07/2024 █▓▒░")
      .setDescription(`
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
╒═══════════════════════════════════════════════╕

**__Petit résumé__** : Voici le dernier résumé des citations de la première année de BTS, concocté avec amour et malice par mon maître <:PhilColins:1225398407762546779>. \n\nBalzano commence la fête avec ses réflexions philosophiques sur les prénoms noirs et ses préférences pour les femmes dénudées. Provost, maître du chaos, nous divertit avec ses 24 TERA de photos douteuses et ses menaces de plantage. Sagnard, toujours imprévisible, s'exclame en toute honnêteté qu'il s'est chié dessus <:shocked_cat:1259107765549400064>.

Guichard, le rêveur romantique, aspire à avoir un esclave, mais prône aussi l'amour des arbres et s'inquiète des Allemands <a:5ieme_reich:1259108292681007165>, tout en nous rappelant d'être "bien mouillé" <:cfai_pikasmirk:1163457620200394833>. Gregory n'est pas en reste avec ses délires sur les accès exclusifs et ses références historiques louches. Ses réflexions sur « ne pas avoir le X » et « penser à l'histoire : SS » ajoutent une touche de mystère à son caractère.

Dumas, notre picoleuse de service, oscille entre le vieux et le chiant tout en évoquant des fumeurs de tapis et des amateurs de tableaux. Elle nous rappelle souvent qu'il y a une première fois à tout <:cfai_pikasmirk:1163457620200394833>.

Vivet, toujours pragmatique avec une touche d'érotisme, se délecte des premières fois et exprime son envie de « voir le bout », ce qui rend les discussions techniques étrangement suggestives. A-t-il besoin d'en parler ? <:mmhhh_weiirddd:1259107755331944480>


╘═══════════════════════════════════════════════╛
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰


￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
**Provost :**

« t une vieille chatte moisi » 
« si je le trouve celui qui a commanditer l'attaque, je le plante » 
« 24 TERA de photo de q » 
« je fabrique un fouet version Sagnart » 

**Sagnard :**

« attend je me suis chier dessus » 

**Guichard :**

« J'aimerai bien avoir un esclave » 
« Moi j'aimerais vous encourager à faire des bisous aux arbres » 
« Moi j'ai peur des Allemands » 
« Si c'est pour boire du pinard là tu me trouveras toujours » 
« Il faut être comme les filles ont dit : bien mouillé » 
« Je l'ai mal pris »
« Toi c'est pas du password hash, c'est du password hachich » 

**Gregory :**

« Ah petite salope tu recraches la purée » 
« Pensez à l'histoire : SS »
« Plus on est bas, plus on est con » 
« ceux qui se mettent pas en root c'est ceux qui travaillent pas » 
« Tu n'a pas le X tu ne peux pas rentrer » 

**Dumas :**

« Plus c'est vieux plus c'est chiant » 
« Il y a une première fois à tout. »
« y'en a qui fume le tapis et vous le tableau »
« ques que vous faites avec vos fesses ? » 

__Edouard :__ <:Edouard2:1253268653076512879> « Wesh qui est ce qui pète la dalle là ? » ---> __Dumas__ : « C'est moi ! » 

**Balzano :**

« Les blacks, y sont perdus » 
« j'aurais préféré une femme dénudée »                                                   
« Zak des nouvelles de sheilianne ? » 

__Thibaut__ : <:Thib:1242754148361961542> « j'ai connu un mec il s'appelait sacré-coeur » ---> __Balzano__ : « c'est souvent les prénoms de noirs ça »

**Charmant :**

« Vous êtes un abricot Dimitri »  


**Vivet :**

« Il y a une première fois à tout »
« J'aimerais bien voir le bout » 
« Je sais pas, mets un point d'arrêt dans ton code pour voir » 


**__BONUS :__**

« Femme et handicapé, c'est un pléonasme » - Anass 
__Enzo__ : <:pedophile_enzo:1242848292312846346> « C'est un marocain » ---> __Jordan__ : <:Jordan:1253266539352686713> « Ah bah il déclare pas tout » 
« si vous voulez me sauter... » - Mathéo 

`)
      .setColor("#6d5050")
      .setAuthor({
        name: `${bot.user.username}`,
        iconURL: `${bot.user.displayAvatarURL()}`
    })
      .setFooter({
        text: `${message.guild.name} - ${new Date().toLocaleString()}`,
        iconURL: message.guild.iconURL({ dynamic: true, format: 'png', size: 1024 })
      });


      const sentMessage = await message.channel.send({ embeds: [embed] });

      await sentMessage.react('👍');

      message.channel.send('@everyone');
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
