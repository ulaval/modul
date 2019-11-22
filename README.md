[![Travis Build Status](https://travis-ci.org/ulaval/modul.svg?branch=develop)](https://travis-ci.org/ulaval/modul)
[![CircleCI Build Status](https://circleci.com/gh/ulaval/modul/tree/develop.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/ulaval/modul)
[![npm version](https://badge.fury.io/js/%40ulaval%2Fmodul-components.svg)](https://badge.fury.io/js/%40ulaval%2Fmodul-components)

# modul

A set of VueJS components for MOD**UL** web applications.

## Documentation

[Check out our documentation](https://ulaval.github.io/modul)

## Getting started to use MODUL in your project

### Quick start install (using Vue CLI)

MODUL can be used in any Vue CLI 3+ project, the first step is to install the dependencies in your project

```bash
npm install @ulaval/modul-components --save
```

- In you main.ts file, install the ModulComponentPlugin and the FrenchPlugin

```typescript
import { ModulComponentPlugin, FrenchPlugin } from '@ulaval/modul-components';


Vue.use(ModulComponentPlugin);
Vue.use(FrenchPlugin);
```

- In the App.vue file, import the global scss and add overrides (if any)

```scss

<style lang="scss">
// modul sass overrides here.

$m-font-path: '~@ulaval/modul-components/dist/assets/fonts/'; //this is required.

@import "~@ulaval/modul-components/dist/styles/main.scss";

</style>

```
- Add the "m-u--app-body" class to the main application div
```html
<template>
  <div id="app" class="m-u--app-body">
      ...
  </div>
</template>

```

MODUL components will now be accessible globaly in all you components template

```html
    <m-button icon-name="m-svg__close-clear">A MODUL Button</m-button>
```

MODUL services are accessible via [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) of the vue instance

```typescript
@Component
export default class HelloWorld extends Vue {
  public openToast(): void {
    this.$toast.show({text: 'Hello World'});
  }
}

```

### Complexe usage

If you need a more advanced solution you can refer to [this repository](https://github.com/ulaval/modul-typescript-template) for a template of a complete MODUL project.

## Contributing to MODUL

### Getting your environment set up

1. Read the [Contribution Guide](./CONTRIBUTING.md)
2. Make sure you have `node` installed with a version at _least_ 10.0.0 and `yarn` of at _least_ 1.17.0 or higher.
3. Run `yarn install` to install all dependencies
4. Run `yarn run storybook` to start storybook or Run `yarn run website` to start documentation website
