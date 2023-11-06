# Introduction

Ce cours est une introduction au langage TypeScript.   
Nous le présentons ici comme un module à part entière, car Angular est écrit en TypeScript.

Le TypeScript permet d'écrire du code **fortement** typé de manière statique ou non. 

Il possède implémente les paradigmes de la POO. Il est donc très adapté à la conception d'application de manière générale.

TypeScript est un « sur-ensemble » de Javascript. 

Le code TypeScript sera **transcompilé**, c'est-à-dire ré-écrit en **code Javascript** compatible pour les navigateurs. 

Il faudra cependant préciser la cible ou la norme que l'on souhaite lors de cette phase de ré-écriture (ES5, ES6, …).

Nous allons décrire dans un premier temps la configuration de base à faire sur votre PC pour suivre les exercices.

## Installation

Il faut bien sûr avoir node et npm installés (versions récentes). Nous allons travailler avec la dernière version de TypeScript (version 5)

```bash
npm install -g typescript
```

Faites un ``` tsc -v ``` en console pour vérifier la version.  

Créez un dossier **TypeScript** sur votre bureau.

Par la suite vous utiliserez comme éditeur de code **Visual Studio Code**.

Notons qu'Angular nécessite TypeScript dans une version **≥ 5.0.4**

Nous vous donnons également un lien vers la documentation officielle :
https://www.typescriptlang.org/docs/home.html (Handbook).  

TypeScript permet de définir des types avancés, ce n'est pas un typage statique classique, vous n'êtes pas obligé de définir tous les types de vos variables, mais lorsque vous travaillez avec ce langage nous vous conseillons **fortement** à les définir. 

En TypeScript vous verrez parfois un type particulier « any », ce type est à éviter, il birse la chaîne de typage. 

En effet, le typage vous apportera de la **sécurité** dans vos développements, pas d'effet de bord, une variable qui change de type par assignation, typage faible de JS.

Un type « any » laissera **donc** passer n'importe quel type dans vos méthodes, fonctions ou variables.

Le typage n'est pas obligatoire dans TypeScript, mais il est indispensable à la conception d'applications complexes et sûr.

Voici quelques exemples de typages de variables dans TypeScript :

### Introduction aux types avec TypeScript

Rappelons la notions de type en JS

L'ensemble des types disponible en JavaScript se compose des valeurs **primitives** et des **objets**.

Les types primitifs sont : boolean, number, bigint, string, symbol, undefined. 

Le type objet est plus simple à appréhender, il est définit lorsqu'on définit un objet classique en JS ou TypeScript.

```typescript
// Type boolean
let isDone: boolean = false;

// Exemples de type number
let hex: number = 0xf00d;
let decimal: number = 6;

// Type string
let color: string = "blue";

// Type bigint
let big: bigint = 100n;

// Type Array de number
let list: number[] = [1,2,3];

// type tuple
let y : [string, number];

y = ["alan", 20];
```

Pour les objets, on utilise souvent les interfaces pour définir un type.

```js
const user = {
  name: "Hayes",
  id: 0,
};
```

Nous pouvons, faire mieux en TS et expliciter le type de l'objet à l'aide d'une interface précisant le type des attributs :

```js
interface User {
  name: string;
  id: number;
  status?: string; // attribut facultatif
}
```

Et définir notre objet User comme étant un type User 

```js
const user : User = {
  name: "Alice",
  id: 1,
};
```

Si on ne définit pas, à la création, le bon objet, on aura une erreur de type :

```js
// type de l'erreur : Property 'id' is missing in type '{ name: string; }' but required in type 'User'.
const u2: User = {
  name: "Alan",
};
```

Le type never 

Lorsqu'une fonction ne retourne strictement rien, comme la fonction suivante, vous devez utiliser ce type.

```js
// attention ne pas exécuter 
function infiniteLoop(): never {
  while (true) {}
}

// les exceptions == never
function bar(): never  {
  throw new Error("Exception ...");
}
```

### Type et fonction

Une fonction peut être typée pour son/ses paramètre(s) et son retour de paramètre(s), le typage composite est également permi.

```typescript

function sayHello(message : string): void | string {

    if(message.trim() != ")
        return message;

    console.error("no message");
}
```

## 01 Exercice

Reprenez l'objet User définit plus haut et créez une fonction showStatus qui prends en paramètre un objet de type User et retourne si il existe le statut de cet objet.

```js
interface User {
  name: string;
  id: number;
  status?: string; // attribut facultatif
}
```

## 02 Exercice

Dans un fichier différent créer une class AddUser qui permet d'ajouter des objets de type User dans un tableau JS.

Vous pouvez vérifier que l'objet que vous ajoutez n'existe pas déjà dans le tableau, et lancez une exception si c'est le cas.

## 03 Exercice challenge (voir TP)

Créez un programme qui permet de créer au hasard des groupes de 2 personnes parmi une classe de 16 élèves.

Les élèves sont définies par des nombres uniques.

```js
const students : number[] = [12, 11, 123, 8, 9, 100, 90, 23, 22, 99, 198, 202, 11, 19, 78, 112] ;
```


### On peut préciser le type d'une variable a posteriori

Supposons que l'on traite une variable dont on ne connait pas le type a priori. On peut donner le type au compilateur, a posteriori comme suit :

```typescript
let message: any = "this is a string";

let strMessage: number = (<string>message).length;
// équivalent à 
let strMessage: number = (message as string).length;
```