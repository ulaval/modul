
# Modul Design Tokens

## CSS Custom Properties

### Colors

#### Import Colors Mixin

```SCSS
@import 'modul-path/src/styles/tokens/colors/colors.mixin';

:root {
    @include m-css-color-tokens();
}
```

### Typographies

#### Import Typographies Mixin

```SCSS
@import 'modul-path/src/styles/tokens/typographies/typographies.mixin';

:root {
    @include m-css-typography-tokens();
}
```

### Import All CSS Custom Properties

```SCSS
@import 'modul-path/src/styles/tokens/css-design-tokens.mixin';

:root {
    @include m-css-design-tokens();
}
```

## SASS

### Import All SASS Variables

No CSS custom properties will be imported

```SCSS
@import 'modul-path/src/styles/tokens';
```

## Tokens List

* Colors
  * CSS Custom Properties and SASS Variables
    * Brand ULaval
    * Grey Color
    * Interactive Color
    * Accent Color
    * Success Color
    * Warning Color
    * Error Color
    * Active Color
    * Disabled Color
    * Border Color
    * Scrollbar Color
* Typographies
  * CSS Custom Properties
    * Font Sizes
    * Line Height
  * SASS Variables
    * Font Family
    * Font Sizes
    * Font Weight
    * Line Height
* Box Effects
  * Borders Width
  * Borders Radius
  * Box Shadows
* Layout
  * Breakpoints
  * Sizes
  * Spaces
* Transitions Duration
