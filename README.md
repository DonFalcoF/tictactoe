# Tic Tac Toe - Application Angular

Bienvenue dans l'application Tic Tac Toe développée avec Angular ! Ce projet est une implémentation du célèbre jeu de stratégie où deux joueurs s'affrontent sur une grille de 3x3.

## Principe du Jeu

Le Tic Tac Toe est un jeu simple mais amusant. Voici les règles de base :

1. **Objectif** : Le but du jeu est d'aligner trois de ses symboles (X ou O) horizontalement, verticalement ou en diagonale sur une grille de 3x3.
2. **Déroulement** : Les joueurs jouent à tour de rôle. Le premier joueur place un X, le second joueur place un O, et ainsi de suite.
3. **Victoire** : Le premier joueur à aligner trois de ses symboles gagne la partie.
4. **Match Nul** : Si tous les emplacements de la grille sont remplis sans qu'aucun joueur n'ait aligné trois symboles, la partie est déclarée nulle.

## Prérequis

Avant de lancer l'application, assurez-vous d'avoir installé les outils suivants :

- **Node.js** : [Télécharger Node.js](https://nodejs.org/)
- **Angular CLI** : Vous pouvez l'installer via npm en utilisant la commande suivante :
  ```bash
  npm install -g @angular/cli
  ```
## Installation

1.  **Cloner le dépôt** : 
  ```bash
git clone https://github.com/DonFalcoF/tictactoe
cd tictactoe
```

2.  **Installer les dépendances** :
  ```bash
npm install
```

## Lancer l'Application
Pour lancer l'application en mode développement, utilisez la commande suivante :

  ```bash
ng serve
```

Ensuite, ouvrez votre navigateur et accédez à http://localhost:4200/. Vous devriez voir l'application Tic Tac Toe en cours d'exécution.

## Développement

### Structure du Projet

-   src/app/ : Contient les composants, services et modules de l'application.
-   src/public/assets/ : Contient les fichiers statiques comme les images et les fichiers CSS.

## Licence
Ce projet est sous licence MIT
