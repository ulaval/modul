# Démarrage

MODUL est une librairie de composants VueJS qui a pour but d'accélérer le développement et d’unifier l’expérience utilisateur des applications web. Ce guide explique comment utiliser MODUL dans votre projet. Un exemple complet d’application utilisant le Vue cli 3+ est disponible sur github <m-link mode="link" target="_blank" url="https://github.com/ulaval/modul-typescript-template">sur ce référentiel github.</m-link>

## Prérequis

- VueJS, la version 2.6 est recommandée.
- Précompilateur Sass pour utiliser les feuilles de styles globale et les variables sass dans les composantes.
- Un bundler de module javascript tel que Webpack, Parcel ou rollup.js, webpack v 4 est recommandé.
- L’utilisation de typescript et de vue-class-component est fortement recommandées.

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

Afin de pouvoir utiliser les composantes MODUL, il est impératif d’installer certains plugins de base dans votre projet. C’est plugins doivent être initialisés au démarrage de votre application, soit avant le $mount de l’instance de Vue. Voici un exemple d'installation minimal dans un fichier main.ts.


```typescript
import '@ulaval/modul-components/lib/modul.min.css'; //1
import Vue from 'vue';
import {
    DialogServicePlugin,
    FRENCH,
    FormPlugin,
    ToastServicePlugin,
    UtilsPlugin,
    UtilsPluginOptions,
} from '@ulaval/modul-components';
import FrenchPlugin from '@ulaval/modul-components/lib/fr';
import DefaultSpritesPlugin from '@ulaval/modul-components/lib/sprites';

const utilsPluginOptions: UtilsPluginOptions = {
    i18PluginOptions: {
        curLang: FRENCH,
    },
    propagateVueParserErrors: false,
};

Vue.use(UtilsPlugin, utilsPluginOptions); //2
Vue.use(FrenchPlugin); //3
Vue.use(DefaultSpritesPlugin); //4
Vue.use(FormPlugin); //5
Vue.use(DialogServicePlugin); //6
Vue.use(ToastServicePlugin); //7

new Vue({
    render: (h) => h(App),
}).$mount('#app');
```
1. Import des css des composants modul.
2. Installation du plugin des services utilitaires communs, soit, le service le journalisation ($log), les services d’internationalisation et de localisation ($i18n et $i10n) , le service de requêtes http ($http), le service des points de rupture ($mq) , le service d’icônographie ($svg) et le service de scrolling animé ($scrollTo). Pour consulter les options de configuration <m-link mode="link" target="_blank" url="https://github.com/ulaval/modul/blob/master/packages/modul-components/src/utils/utils-plugin.ts">voir ce fichier</m-link>
3. Installation du plugin des libellés français des composants. Pour l'anglais, utiliser le EnglishPlugin.
4. Plugin des icones
5. Plugin du système de formulaires (optionel)
5. Plugin du service des dialog (optionel)
6. Plugin du service des toasts (optionel)

<m-link mode="link" target="_blank" url="https://github.com/ulaval/modul-typescript-template/blob/master/src/main.ts">Exemple complet sur Github</m-link>

## Installation des feuilles de styles globales et de la police de caractères

MODUL fournit un cadre de développement Sass qui permet d’utiliser certaines classes css utilitaires dans les applications et une police de caractère commune. Pour l’utiliser le projet doit être en mesure de pré-compiler les feuilles de styles Sass et les éléments suivants:

Le fichier main.scss doit importer directement et le fichier main.scss et redefinir le lien vers la police de caractère.

```scss

$m-font-path: '~@ulaval/modul-components/dist/assets/fonts/';

@import "~@ulaval/modul-components/dist/styles/main.scss";

```
Ensuite la classe m-u--app-body doit être appliquée à la balise HTML de base qui englobe l’application MODUL ou on veut utilisé les styles.

```html
<template>
  <div id="app" class="m-u--app-body">
      ...
  </div>
</template>

```

## Installation des composants à-la-carte (methode recommandé)

Cette méthode d'installation est recommandée par rapport à une installation globale car, elle permet une meilleure performance au démarrage et un meilleur "treeshaking" du "bundle"  de l'application. Pour utiliser un composant MODUL dans un composant vueJS il faut procéder a <m-link mode="link" target="_blank" url="https://fr.vuejs.org/v2/guide/components-registration.html#Creation-locale">une installation locale.</m-link>

Voici un example d’utilisation avec les vue class component dans un composant vueJS

```typescript
import { Component, Vue } from 'vue-property-decorator';
import { MButton } from '@ulaval/modul-components';
import { MAdd } from '@ulaval/modul-components';
import { MIconButton } from '@ulaval/modul-components';
import { MIconFile } from '@ulaval/modul-components';
import { MProgress } from '@ulaval/modul-components';
import { MIcon } from '@ulaval/modul-components';

@Component({
    components: {
        'm-button': MButton,
        'm-add': MAdd,
        'm-icon-button': MIconButton,
        'm-icon-file': MIconFile,
        'm-progress': MProgress,
        'm-icon': MIcon,
    },
})
export default class Boutons extends Vue {}
```

Pour consulter la liste des composantes disponibles dans la distribution <m-link mode="link" target="_blank" url="https://github.com/ulaval/modul/blob/master/packages/modul-components/src/lib.ts">voir ce fichier</m-link>.


## Installation des composants globale (methode obsolète)

La distribution de MODUL inclus aussi un plugin qui installe tous les composantes globalement à l’application et plus de tout les services, filtre et directives.

Voici un example de fichier main.ts qui utilise se plugin

```typescript

import '@ulaval/modul-components/lib/modul.min.css';
import Vue from 'vue';
import {
    ModulComponentPlugin,
    FRENCH
} from '@ulaval/modul-components';
import FrenchPlugin from '@ulaval/modul-components/lib/fr';
import DefaultSpritesPlugin from '@ulaval/modul-components/lib/sprites';


Vue.use(FrenchPlugin);
Vue.use(DefaultSpritesPlugin);

Vue.use(ModulComponentPlugin, { curLang: options.curLang });

new Vue({
    render: (h) => h(App),
}).$mount('#app');
```

Tous les composants MODUL seront alors disponble dans vos templates VUE

```html
<m-button icon-name="m-svg__close-clear">A MODUL Button</m-button>
```


