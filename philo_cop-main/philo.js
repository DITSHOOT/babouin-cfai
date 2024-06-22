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
    name: "les bruits de shakespeare",
    type: Discord.ActivityType.Listening,
  },
  {
    name: 'à travers le verre, trouve la sagesse au fond de la bouteille :)"',
    type: Discord.ActivityType.Watching,
  },
  {
    name: "deviner dans chaque verre l'énigme de l'âme",
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
  if (message.content.startsWith(config.prefix + 'annonce')) {
    message.delete(); // suppression du message direct
    
    const embed = new Discord.EmbedBuilder()
      .setTitle("░▒▓█ CITATION du 10/02/2024 █▓▒░")
      .setDescription(`
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
╒═══════════════════════════════════════════════╕

**__Petit résumé__** : Dans l'univers déjanté de Balzano, où le babouin est l'incarnation de la satisfaction, Boute s'exprime avec des "Suckers" et des injonctions à "Fermer vos gueules". Pendant ce temps, Dumas dévoile ses pensées sur le romantisme de Jean Luc et Mireille, prône le Doliprane comme remède miracle, et s'interroge sur la régularisation de la prostitution tout pensant à Zakaria. Mr. Guichard, fumeur endurci, associe la neige à sa vieille clope et considère l'Union Européenne comme le 4ème Reich, tout en donnant l'impression de déjà connaître ce mystérieux Reich. Provost, maître de l'humour corrosif, questionne sur les incidents claviers-porno et dénonce la "violence" dans un cours qu'il compare à un élevage de porcs. Sagnard, toujours dans l'excentricité, remercie pour la "plus grosse", explore des analogies douteuses sur les étoiles de David, et classe le réseau comme "kebab". Vivet, expert des répliques cinglantes, accuse un étudiant d'avoir une diarrhée verbale, partage son passé de coureur lent, menace de coups de pieds le même étudiant qui met ses pieds sous sa table, et assiste impassible au coming-out d'Enzo. Enfin, confronté à la souffrance persistante de ses collègues sur plusieurs mois, Dimitri franchit le pas, plonge dans une expression libérée, et implore Vivet d'arrêter de tourner, soulignant les maux de tête que cela lui occasionne. En guise d'anecdote, Vivet s'assoit paisiblement sur sa chaine et se déplace comme s'il marchait sur la Lune, plongeant l'endroit dans un silence total. Aurait-ce résolu le problème ?

╘═══════════════════════════════════════════════╛
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰


￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
**Balzano :**

« Le babouin serra content. »

**Boute :**

« Suckers »
« Fermez vos gueules »


**Dumas :**

« Le jean Luc il est chaud lapin avec la Mireille »
« Un doliprane et ça repart »
« J'écoutais Booba quand j'étais plus jeune »
« On devrait régulariser la prostitution »
« La drogue ca n'existe pas »
« J'ai pensé a vous Zakaria »
« Euh connard pourqoi ca marche pas »
« On déshabille  20 personne pour habiller l'autre »
« Ils nous font chier les Allemands »
« »

**Mr. Guichard :**

« Je vais aller voir la neige »
« Pour moi le 4ieme Reich c'est Union Européenne »
« je connais le 4iem Reich j'y ai deja penser »
« Je vais me faire ma clope avant de me geler les couilles »
« Salaud toi tu m'a donner envie de manger des ribes sauces barbecue »


**Provost :**

« Qu'est ce que t'as fait tomber sur tes touches pendant que tu regardais ton porno ? »
« En tout cas elle est pas raciste envers les gitans »
« Cherche pas je t'ai rodave »
« Pourquoi tant de violence »
« Parce que vous êtes des esclaves »
« Je sais pas si je suis dans un cours ou un élevage porc »
« TCHOU » - Provost
« Je m'entraîne à avoir une augmentation »

**Sagnard :**

« Ah merci vous m'avez laisser la plus grosse »
« Au pays des négros »
« Va leur demander à ceux qui portaient l’étoile de David sur leur pyjama si c’était une croix. Ah ba non tu peux pas. »
« Le réseau il est kebab »
« T'etait en train de steamer sur OnlyFan ? »
« Internet c'est pour le porno » 


**Vivet :**

« Tu veux montrer que tu sais, mais tu sais rien, tu es atteint d'une logorrhée et à ton âge c'est grave. C'est une diarrhée verbale. »
« Quand j'étais jeune, je courrais pas vite »
« Si tu mets encore tes pieds sous ma table, je te donne coups de pieds »
« Y fait son coming-out (Pauvre Enzo..) »

**Wallon :**

« Ok t'es con enfaite »


￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
**__BONUS :__** 

« C'est sous les plus gros rocher que ce cache les plus gros serpent » - Nicolas
« Tu remarques que tu es gros, quand tu vois plus ta bite » - Dimitri
« Monsieur vous pouvez arrêter de tournée, vous me faites mal a la tête » - Dimitri 
« Les  malgache, c’est ceux qui habitent au Maroc non ? » - Jordan le raciste 

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
