#!/bin/bash

# Chemin vers le répertoire de logs
logs_directory="/volume1/homes/dimitrichassignol/Autres/bot/logs"

# Assurez-vous que le répertoire de logs existe
mkdir -p "$logs_directory"

# Démarrer chaque bot individuellement avec pm2 en forcant la re-execution si nécessaire
pm2 start "/volume1/homes/dimitrichassignol/Autres/bot/push_cop-main/push.js" --name "push" --log "$logs_directory/push.log" -f
pm2 start "/volume1/homes/dimitrichassignol/Autres/bot/bad_cop-main/bad.js" --name "bad" --log "$logs_directory/bad.log" -f
pm2 start "/volume1/homes/dimitrichassignol/Autres/bot/philo_cop-main/philo.js" --name "philo" --log "$logs_directory/philo.log" -f
pm2 start "/volume1/homes/dimitrichassignol/Autres/bot/kind_cop-main/kind.js" --name "kind" --log "$logs_directory/kind.log" -f

# Message de confirmation
echo "Tous les bots sont démarrés ! Les logs sont disponibles dans : $logs_directory"

