Le composant *boîte* est utilisé pour mettre en évidence un court texte. Il ne devrait pas être utilisé pour mettre en forme une section complète. Il est possible de changer son apparence selon le contexte où il est employée. Par exemple, changer sa couleur, ajouter des bordures, modifier ses marges internes, etc.

<modul-do>
    <ul>
        <li>S'assurer de la cohérence du traitement visuel des boîtes lorsque plusieurs boîtes cohabitent dans la même interface.</li>
        <li>Lorsque la couleur d'arrière-plan du conteneur parent de la boîte est blanche, l'ombre portée devrait être retirée.</li>
    </ul>
</modul-do>

<modul-dont>
    <ul>
        <li>Éviter d'utiliser le composant *boîte* comme le gabarit d'une page, car il doit servir à grouper et mettre en évidence du contenu et non à accueillir le contenu entier d'une page.</li>
        <li>Éviter d'abuser du style <em>mise en évidence</em>.</li>
    </ul>
</modul-dont>

## Caractéristiques

### Entête
Il est possible d'utiliser le composant *boite* avec un entête et un titre, mais ce n'est pas obligatoire. Le style du titre n'est pas normé et est à la discrétion de l'analyste.

<modul-demo>

```html
<m-panel>
    <h2 slot="header">Titre</h2>
    Do consectetur aute pariatur amet ut pariatur Lorem. Commodo exercitation et incididunt tempor aliqua culpa culpa. Do sint exercitation quis amet.
</m-panel>
```

</modul-demo>

### Marges internes (padding)
La largeur des marges internes est ajustée selon les points de rupture. Par exemple, pour les petits écrans, les marges seront automatiquement réduites. Il est également possible de retirer les marges internes de la boîte, lorsque celles-ci ne répondent pas au besoin.

<modul-demo>

```html
<m-panel :padding="false">
    Do consectetur aute pariatur amet ut pariatur Lorem. Commodo exercitation et incididunt tempor aliqua culpa culpa. Do sint exercitation quis amet.
</m-panel>
```

</modul-demo>

### Mise en évidence
Pour attirer l'attention sur une boîte en particulier, il est possible d'ajouter une bordure orange qui mettra en évidence la boîte.

<modul-demo>

```html
<m-panel :highlighted="true">
    Do consectetur aute pariatur amet ut pariatur Lorem. Commodo exercitation et incididunt tempor aliqua culpa culpa. Do sint exercitation quis amet.
</m-panel>
```

</modul-demo>

### Couleurs
Le composant *boîte* offre trois couleurs&nbsp;: blanc, gris pâle et gris foncé.

<modul-demo>

```html
<m-panel skin="light">
    Do consectetur aute pariatur amet ut pariatur Lorem. Commodo exercitation et incididunt tempor aliqua culpa culpa. Do sint exercitation quis amet.
</m-panel>
<m-panel skin="dark">
    Do consectetur aute pariatur amet ut pariatur Lorem. Commodo exercitation et incididunt tempor aliqua culpa culpa. Do sint exercitation quis amet.
</m-panel>
<m-panel skin="darker">
    Do consectetur aute pariatur amet ut pariatur Lorem. Commodo exercitation et incididunt tempor aliqua culpa culpa. Do sint exercitation quis amet.
</m-panel>
```

```css
.m-panel {
    margin-top: 12px;
}
```

</modul-demo>

### Bordures et ombre portée
Les bordures et l'ombre portée permettent à la boîte d'obtenir un plus grand contraste avec son environnement. Les bordures possèdent également deux largeurs&nbsp;: régulière et large.

<modul-demo>

```html
<m-panel :border-large="false">
    Do consectetur aute pariatur amet ut pariatur Lorem. Commodo exercitation et incididunt tempor aliqua culpa culpa. Do sint exercitation quis amet.
</m-panel>
<m-panel :border-large="true">
    Do consectetur aute pariatur amet ut pariatur Lorem. Commodo exercitation et incididunt tempor aliqua culpa culpa. Do sint exercitation quis amet.
</m-panel>
<m-panel :shadow="false">
    Do consectetur aute pariatur amet ut pariatur Lorem. Commodo exercitation et incididunt tempor aliqua culpa culpa. Do sint exercitation quis amet.
</m-panel>
<m-panel :shadow="true">
    Do consectetur aute pariatur amet ut pariatur Lorem. Commodo exercitation et incididunt tempor aliqua culpa culpa. Do sint exercitation quis amet.
</m-panel>
```

```css
.m-panel {
    margin-top: 12px;
}
```

</modul-demo>
