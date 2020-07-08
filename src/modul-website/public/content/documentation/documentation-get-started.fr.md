# Démarrage

MODUL est une librairie de composants VueJS qui a pour but d'accélérer le développement et d’unifier l’expérience utilisateur des applications web. Ce guide explique comment utiliser MODUL dans votre projet. Un exemple complet d’application utilisant le Vue cli 3+ est disponible sur github <m-link mode="link" target="_blank" url="https://github.com/ulaval/modul-typescript-template">sur ce référentiel github</m-link>

## Prérequis

- VueJS, la version 2.6 est recommandée
- Précompilateur Sass pour utiliser les feuilles de styles globale et les variables sass dans les composantes
- Un bundler de module javascript tel que Webpack, Parcel ou rollup.js, webpack v 4 est recommandé
- L’utilisation de typescript et de vue-class-component est fortement recommandées

## Installation

Le package `@ulaval/modul-components` est disponible sur <m-link mode="link" target="_blank" url="https://www.npmjs.com/package/@ulaval/modul-components">npmjs</m-link>. Vous pouvez utiliser npm ou yarn pour avoir la installer la dernière version.


```bash
npm install @ulaval/modul-components --save
```


Avec le gestionnaire de packages Yarn

```bash
yarn add @ulaval/modul-components
```

## Installation des plugins de base

Afin de pouvoir utiliser les composantes MODUL, il est impératif d’installer certains plugins de base dans votre projet. C’est plugins doivent être initialisés au démarrage de votre application, soit avant le $mount de l’instance de Vue. Voici un exemple d'installation minimal dans un fichier main.


```typescript
import '@ulaval/modul-components/lib/modul.min.css';

const utilsPluginOptions: UtilsPluginOptions = {
    i18PluginOptions: {
        curLang: FRENCH,
    },
    propagateVueParserErrors: false,
};
```

