# Examen

Dans une application sécurisée par vos soin avec Angular, et d'autres technologies, vous allez développer une interface permettant de faire des statistiques sur un Dataset spécifique : le titanic.

L'utilisation d'Angular pour l'interface utilisateur doit être utilisé.

L'objectif de l'application et d'afficher les survivants du Titanic en fonction du sexe, de l'age et de la classe des billets.

Si vous avez le temps la piste graphique à suivre est le design Web de l'application kaggle.com.

## Contraintes techniques

- 1. Votre code sera versionné à l'aide de Git sur Github ou Gitlab. (une branche MAIN et DEV)

- 2. (Installation d'Angular) Utilisez Angular pour l'interface utilisateur récupérez le fichier des données.

- 3. Utilisez l'API titanic dans les sources pour récupérer les données.

```bash
cd titanic
npm install
```

- 4. Il faudra également mettre en place une page de login/password pour la consultation des statistiques.

- 5. Vous devez faire la partie interface utilisateur à partir du chapitre qui suit ci-dessous.

- 6. Si vous avez le temps enregistrez les données des statistiques dans le fichier stat.json dans le dossier Data.

## Analyse des données & pages à réalisées

Après avoir créer le dépôt et installé Angular sur votre machine.

1. Importez les données à l'aide de l'API :

Installation de l'API, dans le dossier **titanic** tapez les lignes de code suivantes :

```bash
# Installation
npm install 

# Serveur API
npm run dev
```

**Routes de l'API  ( URL (racine du serveur) de l'API http://localhost:3002/)**

```txt
# Importer de tous les passagers
api/passengers

# Importer les survivants avec un status 0 ou 1 pour respectivement mort ou vivant 
api/passengers/Survived/:status

``` 

2. Créez la page de login, page principale de l'application. Une fois connecté on sera redirigé vers la page pour lancer les analyses statistiques, vous pouvez faire page à la fin.

3. Créez la page de **recherche** à proprement parlée, elle comportera un menu principale permettant de se connecter et déconnecter.

*Remarque vous pouvez modifier les routes (fichier routes.ts) de votre API, pour récupérer les données de manière plus spécifique, attention à ne pas casser le code de l'API.*

Le choix du sexe, de l'age et de la classe (Pclass dans le dataset) seront optionnels. Notez bien que vous faites ici que du GET, l'API pour l'instant. Vous pouvez découper le développement de l'application, faite d'abord une recherche sur le Sex, puis l'age et enfin la classe. On cherche à afficher les survivants.

```text
Sex : [] Age : [] Classe []
[Analyser]
```

- Si vous voulez vous pouvez également ajouter une option pour avoir ceux qui n'ont pas survécu. 

```text
Suvived : () yes (*) no
Sex : [] Age : [] Classe []
[Analyser]
```

4. Persistance des données

Si vous souhaitez sauvegarder des résultats dans le fichier stat.json (voir le dossier Data), voyez la structure des données dans le fichier stat.json, et inspérez vous de cette structure.

```json
{
    "Sex": {
        "Survived": 0,
        "Died": 0
    },
    "SexAge": {
        "Survived": 0,
        "Died": 0
    },
    "SexAgePclass": {
        "Survived": 0,
        "Died": 0
    },
    "No": {
        "Survived": 0,
        "Died": 0
    }
}
``` 

## Remarques 

Dans un terminal, si vous avez **curl** tester la ligne suivante :

```bash
curl -d '{ "Survived":"10", "SexAgePclass" : "1" }' -H "Content-Type: application/json" -X POST http://localhost:3200/stat
```

Une fois la recherche effectuée vous redirigerez l'utilisateur vers une page proposant une synthèse des résultats. Un bouton Reset permettra d'effacer la recherche et de revenir à la page précédente.

```text

Synthese

[Reset]

```

4. Améliorez maintenant l'analyse des données

Introduisez les éléments suivants dans la rechercher

- La moyenne

- L'écart type

5. (facultatif) Inventez une autre recherche sur l'analyse de ces données.
