Le sélecteur de fichiers permet à l'utilisateur de sélectionner un ou plusieurs fichiers avec la fenêtre de sélection standard de l'appareil.

## Caractéristiques

### Comportement du m-button

Le composant offre les mêmes propriétés et évènements que le m-button.

### Sélection de fichiers multiples

La propriété **"multiple"** permet d'activer la sélection de plus d'un fichier.

<modul-demo>

```html
<m-file-select multiple>Sélectionner</m-file-select>
```

</modul-demo>

### Service $file

Le composant fonctionne de pair avec le service $file qui est disponible dans tout composant.

```javascript
Vue.component('component', {
    methods: {
        exemple() {
            this.$file; //...
        }
    }
});
```

Les fichiers sélectionnés sont ajoutés au stockage $file par défaut.
