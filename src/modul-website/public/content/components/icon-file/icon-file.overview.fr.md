Les icônes de fichier sont un repère efficace pour identifier rapidement le type d'un fichier. Il est recommandé de les utiliser vis-à-vis du nom du fichier, particulièrement lorsqu'ils sont affichés sous forme de liste. Afin de préserver la cohérence des interfaces, l'association entre l'extension du fichier et l'icône est toujours la même. Si le type de votre fichier n'est pas supporté, une icône par défaut est affichée.

## Caractéristiques

### Couleur
De façon générale, les icônes fichiers héritent de la couleur de la police de caractères du contexte dans lequel elles sont utilisée. Par exemple, une icône qui accompagne un lien cliquable sera de la couleur de la police appliquée aux liens. Quelques exceptions confirment cette règle pour les types de fichier qui représentent une marque déposée comme les docouments PDF ou Word. Ces icônes sont de la couleur originale de la marque pour les rendre encore plus facilement reconnaissables.
<!-- Exemple d'icône de fichier Word et PDF et d'autre dans la couleur d'origine. -->

<modul-demo>

```html
<m-icon-file extension="pdf"></m-icon-file>
<m-icon-file extension="doc"></m-icon-file>
<m-icon-file extension="odt"></m-icon-file>
```

</modul-demo>

### Pastille
Une pastille peut-être superposée à une icône de fichier, pour représenter un fichier téléversé avec succès par exemple. Voir <modul-go name="m-icon"></modul-go> pour plus de détail.
<!-- Exemple d'icône de fichier avec pastille comme dans le téléverseur succès et error -->

<modul-demo>

```html
<m-icon-file extension="pdf" v-m-badge="{ state: 'completed'}"></m-icon-file>
<m-icon-file extension="doc" v-m-badge="{ state: 'warning'}"></m-icon-file>
<m-icon-file extension="odt" v-m-badge="{ state: 'error'}"></m-icon-file>
```

</modul-demo>

