<modul-preview>

```javascript
{
    data: {
        selectedItem: "1"
    }
}
```

```html
<m-navbar :selected.sync="selectedItem" skin="nav-main"
     :multiline="true" title-button-left="Naviguer précédent"
              title-button-right="Naviguer suivant"
              max-width="720px">
    <m-navbar-item value="1">item #1</m-navbar-item>
    <m-navbar-item value="2">item #2</m-navbar-item>
    <m-navbar-item value="3">item #3</m-navbar-item>
</m-navbar>
```

</modul-preview>
