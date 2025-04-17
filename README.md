# 📘 Projet Bot Babouins Discord

Le projet **Bot Babouins** est un ensemble de bots Discord développés pour la classe BTS SIO. Chaque bot a sa spécialité pour faciliter la gestion et l'interaction au sein de la classe.

![Le Babouin le Bienveillant](./img/kind_bot.jpg)  
● **Le Babouin le Bienveillant** : Annonce les annonces générales, les événements et les comptes rendus de classe.

![Le Babouin le Philosophe](./img/philo_bot.jpg)  
● **Le Babouin le Philosophe** : Partage les citations marquantes des formateurs.

![Le Babouin le Push/Repo](./img/push_bot.jpg)  
● **Le Babouin le Push/Repo** : Rappelle de faire des push sur Git à des heures précises dans la semaine.

![Le Babouin le Flic du Quartier](./img/bad_bot.jpg)  
● **Le Babouin le Flic du Quartier** : Assure le maintien de l'ordre et de la discipline dans la classe.


## Hébergement

Ces bots sont hébergés sur un NAS Synology et sont gérés via [PM2](https://pm2.keymetrics.io/), un **gestionnaire de processus** pour [Node.js](https://nodejs.org/).

- **Node.js**: Plateforme utilisée pour construire des applications en JavaScript côté serveur.
- **PM2**: *Process Manager* pour Node.js, permet de gérer et de maintenir des applications Node.js en ligne de manière **robuste et efficace**.

### Gestion avec PM2

**PM2** assure une **connexion continue** de vos bots. En cas de d'erreur, **PM2 se charge automatiquement de les relancer**, assurant ainsi une disponibilité constante. Il propose aussi un système de log très compréhensible avec la commande `pm2 log`. Cette solution est plus fiable que certains hébergeurs comme Heroku. PM2 vous offre un **contrôle total** sur la gestion de vos bots. Vous pouvez consulter la <u>documentation complète</u> sur la gestion des bots Discord avec PM2 qui est très bien faite [ici](https://discordjs.guide/improving-dev-environment/pm2.html#installation).

## Sauvegarde Automatique

Chaque **mardi à 10h**, un commit automatique est créé pour assurer la sauvegarde des données et prévenir toute perte éventuelle.

<br>
Créé avec ❤️ par Dimitri Chassignol - 2025
