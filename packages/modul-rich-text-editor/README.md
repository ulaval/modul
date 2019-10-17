# `modul-rich-text-editor`

## Installation

### Prérequis

1. Avoir un projet MODUL bien configurer
 Voir [ce répertoire](https://github.com/ulaval/modul-typescript-template).

2. Installez la dépendance

```bash
npm install @ulaval\rich-text-editor@latest --save
```

3. Installez le plugin

```
import { RichTextLicensePlugin } from '@ulaval/modul-rich-text-editor/dist/components/rich-text-editor/rich-text-license-plugin';

Vue.use(RichTextLicensePlugin, { key: `test`, curlang: FRENCH });
```

## Utilisation en mode global

https://fr.vuejs.org/v2/guide/components-registration.html#Creation-globale

## Utilisation en mode local (avec code splitting)

https://fr.vuejs.org/v2/guide/components-registration.html#Creation-locale
