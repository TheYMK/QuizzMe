# __Architecture logiciel__

Mini application implémentant un jeu de culture générale. Le but de cette application est de proposer une interface web permettant à un utilisateur de lancer une partie à partir d’un ensemble de questions, en fonction d’une catégorie pré-sélectionnée.

<br>

## Introduction

Les principales fonctionnalités sont les suivantes :

- pouvoir s’inscrire et se connecter ; le jeu sera accessible uniquement aux utilisateurs inscrits et connectés

- pouvoir jouer une partie, en fonction de divers paramètres (nombre de questions, catégorie, difficulté, etc...)

- pouvoir consulter ses scores : un utilisateur connecté doit pouvoir visualiser les scores qu’il a obtenu lors des parties passées
  
<br>

## Procédure d'installations des différents modules

### Microservices

L'application est composé de 3 microservices. Les microservices sont : user, game, et score. Ils tournent respectivement sur les ports 8080, 8081, 8082. Ces ports sont
les mêmes pour le réseau interne à docker, comme pour ceux exterieurs. Ces ports doivent donc être disponible, et non utilisés par d'autre application.

Comme préciser précedemment, ces microservices sont containerizer via Docker, et peuvent être initialiser par la commande suivante :

```
$ docker-compose up
```

### API Gateway

L'API gateway est la passerrelle entre le client et les microservices. Le client ne peut accéder aux microservices (à part en local pour faciliter le développement => cors: 0.0.0.0), cependant, il peut communiquer avec cette api, qui elle même à la possibilité d'échanger avec les 3 microservices précédents.

Cette API, tourne sous un server NodeJs (+ framework expressJs) sur le port 3001, et peut être instancier par les commandes suivantes :

```
$ npm i 
$ node index
```

### Client / interface

Le client, en communication directe avec l'API gateway utilise le framework front-end VueJs. De plus, pour faciliter son développement nous avons utiliser le framework PrimeVue offrant un ensemble de composants et d'outils.

Le client quant à lui tourne sur le port 3000 et se lance en executant la suite de commandes suivantes :

```
$ npm i
$ npm run serve
```

## Pré-requis

Le premier pré-requis est Docker afin de pouvoir containerizer les images de nos microservices.
Le second est NodeJs afin de lancer les serveurs utilisant le Javascript V8.
Le troisième et dernier est NPM, afin d'installer toutes les dépendences liées à un module (pour Javascript).

Pour récapituler, les éléments requis sont :

- Docker
- NodeJs
- NPM
- Une connexion internet

<br>

## Les données du jeu

Toutes les données contenues dans ce projet proviennent de github OpenSource https://github.com/uberspot/OpenTriviaQA .
L'ensemble des données ont été lu et filtrer pour convenir au mieux à notre model de base de données. Pour cela nous avons créé un script accessible ici : https://github.com/Lilian-MMI/architecture_logicielle_tp_final_data . 
Les fichiers créés à la suite de ce script ont permis de créer un ensemble de fixtures (de quizzs et de questions) afin de peupler notre projet de données de jeu. 

Nous avons au total 2494 quizz et 49716 questions. Chaque quizz comporte au maximum 20 questions. 

<br>

## Dépot SCM

Le projet est disponible à l'adresse URL suivante : https://github.com/Lilian-MMI/architecture_final_project
