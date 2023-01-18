# Modul Styles

## Import All Styles

SASS Import

```SCSS
@import 'modul-path/src/styles/main';
```

TypeScript Import

```TS
import 'modul-path/src/styles/main.scss';
```

## Change Font Familly

Try to limit the number of font imports into your project. Make sure you only download the font once.

### Use Local Font

`main.scss` file of your project

```SCSS
@charset 'utf-8';

// Set root import path
$m-font-root-path: 'path-local/assets/fonts/';

// Set font fallback import paths
$m-font-light-path: '#{$m-font-root-path}font-light';
$m-font-regular-path: '#{$m-font-root-path}font-regular';
$m-font-semi-bold-path: '#{$m-font-root-path}font-semi-bold';

// Set font variable import paths
$m-font-variable-path: '#{$m-font-root-path}font-variable';
$m-font-variable-italic-path: '#{$m-font-root-path}font-variable-italic';

// Set the name of your new font family
$m-font-family: 'New Font Variable Name';
$m-font-family-fallback: 'New Font Name';

// Import default Modul styles
@import 'modul-path/src/styles/main';
```

### Use Google Font

#### Example 1: HTML import

`index.html` file of your project

```HTML
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@200..900&display=swap" rel="stylesheet">
```

`main.scss` file of your project

```SCSS
@charset 'utf-8';

$m-font-family: 'Unbounded';
$m-font-family-fallback: 'Unbounded';

@import 'modul-path/src/css-design-tokens';
@import 'modul-path/src/app-root';
@import 'modul-path/src/root/animations';
```

#### Example 2: CSS import

`main.scss` file of your project

```SCSS
@charset 'utf-8';

$m-font-family: 'Unbounded';
$m-font-family-fallback: 'Unbounded';

@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@200..900&display=swap');

@import 'modul-path/src/css-design-tokens';
@import 'modul-path/src/app-root';
@import 'modul-path/src/root/animations';
```

### Change Font Familly of `common.scss` File

`commons.scss` file of your project

```SCSS
// Set the name of your new font family
$m-font-family: 'New Font Variable Name';
$m-font-family-fallback: 'New Font Name';

// Import default Modul commons styles
@import 'modul-path/src/styles/commons';
```

## Customize the `main.scss` File of your Project

### Use only the styles you need

`main.scss` file of your projet

```SCSS
@charset 'utf-8';

@import 'modul-path/src/styles/commons';
@import 'modul-path/src/styles/tokens/css-design-tokens.mixin';
@import 'modul-path/src/styles/root/app-root.mixin';

// Import utility class mixins
@import 'modul-path/src/styles/utils/layout/layout.mixin';
@import 'modul-path/src/styles/utils/typographies/typographies.mixin';
@import 'modul-path/src/styles/utils/components/link/link.mixin';

.mpo-portail-root {
    @include m-css-design-tokens();

    @include m-app-root();

    // Include the utility class mixins you need
    @include mu-layout();
    @include mu-typographies();
    @include mu-link();
}
```
