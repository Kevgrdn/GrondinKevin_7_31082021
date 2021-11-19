# GrondinKevin_7_31082021
Projet n°7 du parcours développeur web d'OpenClassrooms

Créez un réseau social d’entreprise

Ceci est le dernier projet d'OpenClassrooms dans lequel j'ai dû me confronter à la réalisation complète d'une application web, comprenant à la fois `backend` et `frontend`. 


Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. 
On peut y partager des éléments texte, des photos, mais également poster des "Likes". Chaque utilisateur doit s'inscrire pour pouvoir avoir accès au site, puis se connecter via l'interface de connexion.
Tous les membres peuvent supprimer leur profil et leurs postes. Les administrateurs peuvent également supprimer les posts des utilisateurs.

---


BACKEND :

L'application a été réalisée avec `NodeJS et Express`. Une `API REST` a été créée et utilisée. En ce qui concerne l'API, les règles de sécurité `OWASP` ont été respectées. 
Une base de donnée `SQL` a été utilisée via `Sequelize`.

FRONTEND :

Le site a été réalisé avec `VueJS, Javascript, HTML et Bootstrap`.




---

INSTALLATION :

- Installer un logiciel de traitement SQL (ex: `MySQL`)
- Créer
- Dans le dossier backend : `npm install -g nodemon` `npm install`
- Créer le fichier `.env` dans le dossier `backend`
- Dans ce fichier, copier les variables d'environnement provenant du fichier `.env.dist` en utilisant vos variables. 
- Dans le dossier backend, via le terminal : `nodemon server`
- Dans le dossier groupomania, via le terminal : `npm install` `npm run serve`
