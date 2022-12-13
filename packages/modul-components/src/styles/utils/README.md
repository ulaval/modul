# Modul Utility Classes

## Import All Utility Classes

```SCSS
@import 'modul-path/src/styles/utils';
```

## Scope Utility Classes with Mixin

```SCSS
@import 'modul-path/src/styles/utils/utils.mixin';

.mu-app-root {
    @include mu-utils();
}
```

## Import CSS Classes Individually

### SASS

```SCSS
@import 'modul-path/src/styles/utils/layout/display/display.mixin';

.classe-name {
    @include mu-display();
}
```

### CSS Result

```CSS
.classe-name .mu-d-block {
    display: block;
}

.classe-name .mu-d-flex {
    display: flex;
}

.classe-name .mu-d-inline {
    display: inline;
}

.classe-name .mu-d-inline-block {
    display: inline-block;
}

.classe-name .mu-d-inline-flex {
    display: inline-flex;
}
```

## Utility Classes List

### Components

#### Link

| Name |
| -- |
| mu-link |
| mu-link-text |
| mu-link-icon-left |
| mu-link-icon-right |
| mu-link-unvisited |

#### Button

| Name |
| -- |
| mu-button-primary |
| mu-button-secondary |
| mu-link-button-disabled |
| mu-button-waiting |

#### Bullet List

| Name |
| -- |
| mu-bullet-list |

#### Label

| Name |
| -- |
| mu-label |

#### Asterisk

| Name |
| -- |
| mu-asterisk |

#### Require

| Name |
| -- |
| mu-require |

### Typographies

#### Font Size

| Name |
| -- |
| mu-font-size |
| mu-font-size-lg |
| mu-font-size-md |
| mu-font-size-sm |
| mu-font-size-xs |

#### Font Style

| Name |
| -- |
| mu-font-style-normal |
| mu-font-style-italic |

#### Font Weight

| Name |
| -- |
| mu-font-weight-black |
| mu-font-weight-bold |
| mu-font-weight-semi-bold |
| mu-font-weight-regular |
| mu-font-weight-light |

#### Typo

| Name |
| -- |
| m-u--typo-precision |
| m-u--typo-precision-italic |
| m-u--typo-highlighting |

#### Titre

| Name |
| -- |
| mu-h1 |
| mu-h2 |
| mu-h3 |
| mu-h4 |
| mu-h5 |
| mu-h6 |
| ---------- |
| mu-p |

### Layout

#### Margin

| Name | Value |
| -- | -- |
| mu-m-4xl | margin: 64px; |
| mu-m-3xl | margin: 56px; |
| mu-m-2xl | margin: 48px; |
| mu-m-xl | margin: 40px; |
| mu-m-lg | margin: 32px; |
| mu-m-md | margin: 24px; |
| mu-m | margin: 16px; |
| mu-m-sm | margin: 12px; |
| mu-m-xs | margin: 8px; |
| mu-m-2xs | margin: 4px; |
| ---------- | ---------- |
| mu-mt | margin-top: 16px; |
| ---------- | ---------- |
| mu-ml | margin-left: 16px; |
| ---------- | ---------- |
| mu-mb | margin-bottom: 16px; |
| ---------- | ---------- |
| mu-mr | margin-right: 16px; |

#### Padding

| Name | Value |
| -- | -- |
| mu-p-4xl | padding: 64px; |
| mu-p-3xl | padding: 56px; |
| mu-p-2xl | padding: 48px; |
| mu-p-xl | padding: 40px; |
| mu-p-lg | padding: 32px; |
| mu-p-md | padding: 24px; |
| mu-p | padding: 16px; |
| mu-p-sm | padding: 12px; |
| mu-p-xs | padding: 8px; |
| mu-p-2xs | padding: 4px; |
| ---------- | ---------- |
| mu-pt | padding-top: 16px; |
| ---------- | ---------- |
| mu-pl | padding-left: 16px; |
| ---------- | ---------- |
| mu-pb | padding-bottom: 16px; |
| ---------- | ---------- |
| mu-pr | padding-right: 16px; |

#### Display

| Name | Value |
| -- | -- |
| mu-d-block | display: block; |
| mu-d-flex | display: flex; |
| mu-d-inline | display: inline; |
| mu-d-inline-block | display: inline-block; |
| mu-d-inline-flex | display: inline-flex; |

#### Max-width and min-width

| Name |
| -- |
| mu-max-w |
| mu-max-w-xs |
| mu-max-w-sm |
| mu-max-w-lg |
| mu-max-w-text |
| ---------- |
| mu-min-w |

#### Visually Hidden

| Name |
| -- |
| mu-visually-hidden |
