# `modul-rich-text-editor`

## Installation

### Prérequis

1. Avoir un projet MODUL bien configurer
 Voir [ce répertoire](https://github.com/ulaval/modul-typescript-template).

2. Installez le packages dans votre projet

```bash
npm install @ulaval\rich-text-editor@latest --save
```

3. Installez le plugin RichTextLicensePlugin

```typescript
import { RichTextLicensePlugin } from '@ulaval/modul-rich-text-editor';

Vue.use(RichTextLicensePlugin, { key: `test` });
```

## Utilisation en mode global

Si vous souhaitez utiliser le composante en mode [globale](https://fr.vuejs.org/v2/guide/components-registration.html#Creation-globale). Installez le plugin suivant dans votre liste de plugin.

```typescript
import { RichTextEditorPlugin } from '@ulaval/modul-rich-text-editor';

Vue.use(RichTextEditorPlugin);
```

le composante est ensuite disponible sous le tag `<m-rich-text-editor>`


## Utilisation en mode local (avec code splitting)

Pour des raison de performance, Il est préférable d'utiliser le composant en mode [locale](https://fr.vuejs.org/v2/guide/components-registration.html#Creation-locale) avec l'utilisation des [dynamic import](https://webpack.js.org/guides/code-splitting/#dynamic-imports) de webpack. Cela permettera de créer un "chunk" qui sera séparé du build final ce qui diminue la taille final du bundle que les utilisateurs auront à télécharger initialement.

Pour ce faire creer un fichier nomé rte.ts dans votre projet qui contient le code suivant
```typescript
import { MRichTextEditor } from '@ulaval/modul-rich-text-editor';

export default MRichTextEditor;
```

Dans vos composantes qui utilise le rte, importer le composant comme suit:

```typescript
@WithRender
@Component({
    components: {
        // tslint:disable-next-line: typedef
        MainLayout, MRichTextEditor: () => {
            return import(/* webpackChunkName: "rte" */ './rte');
        }
    }
})
export default class AboutPage extends Vue {

        ...
}

```
