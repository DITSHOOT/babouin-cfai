
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

Ces bots sont hébergés sur **[Pterodactyl](https://pterodactyl.io/)**, une plateforme de gestion de serveurs dédiée à l'hébergement d'applications comme des bots Discord.

- **[Node.js](https://nodejs.org/)** : Plateforme utilisée pour construire des applications en JavaScript côté serveur.
- **[Pterodactyl](https://pterodactyl.io/)** : *Game server manager* open-source qui permet de gérer facilement des serveurs applicatifs.

### Gestion avec Pterodactyl

**Pterodactyl** assure une **connexion continue** de vos bots. En cas d'erreur ou de crash, **le redémarrage automatique est géré directement par le panel**, assurant ainsi une disponibilité constante. Il permet aussi un suivi des logs, une console interactive, et des actions programmées. Cette solution est **fiable et centralisée**, tout en vous offrant un **contrôle total** sur la gestion de vos bots. Vous pouvez consulter la documentation complète de Pterodactyl [ici](https://pterodactyl.io/panel/1.0/getting_started.html).

## Sauvegarde Automatique

Chaque **mardi à 10h**, un commit automatique est créé pour assurer la **sauvegarde des données** et prévenir toute perte éventuelle.

### Tâche Cron

Pour assurer la sauvegarde automatique, une tâche cron a été configurée sur le serveur avec la commande suivante :

```
* 10 * * 2 /path/to/backup_script.sh
```

Cela lance le script de sauvegarde chaque mardi à 10h.

<br>
Créé avec ❤️ par Dimitri Chassignol - 2025

