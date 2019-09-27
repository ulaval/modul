Le composant *action en cours* s'affiche lorsqu'une action est en train de s'exécuter et que le temps restant est inconnu, par exemple, lors du chargement de nouveaux résultats de recherche, lors de l'exécution d'un traitement, etc.

## Caractéristiques

### Chargement en cours
Lorsque la page entière est en chargement, une page blanche est affichée avec le composant *action en cours*. Toutefois lorsque l'action en cours concerne une seule ou plusieurs sections de la page, par exemple lors du chargement de résultats de recherche, le composant doit s'afficher à l'endroit où l'éventuel contenu s'affichera. Puisque plusieurs sections peuvent être chargées au même moment, cela implique l'affichage simultané de plusieurs composant *action en cours*.

<modul-demo>

```html

<m-spinner></m-spinner>

```

</modul-demo>

### Traitement en cours
Lorsqu'un traitement est en cours d'exécution et que toute la page est bloquée, le composant *action en cours* s'affiche par-dessus la page, avec un effet de transparence noir.

<modul-demo>

```javascript
{
    data: {
        open: false
    },
    methods: {
        superClick() {
            this.open = true;
            var _self = this;
            setTimeout(function(){ _self.open = false }, 2000);
        }
    }
}
```

```html
<p>Cliquez sur l'interrupteur pour afficher l'exemple.</p>
<p>
    <m-switch @click="superClick" v-model="open" :state-text="false"></m-switch>
    <m-spinner v-if="open" :title="true" :description="true" :processing="true"></m-spinner>
</p>
```

</modul-demo>

### Message
Le composant *action en cours* permet l'ajout d'un titre et d'une description. Il est fortement suggéré de faire afficher le titre et la description lorsque l'icône est utilisée dans un contexte de traitement. Par défaut, le titre sera affiché en gras et la description sera affichée sous le titre.

<modul-demo>

```html
    <m-spinner :title="true" :description="true"></m-spinner>
```

</modul-demo>

### Couleurs
Plusieurs couleurs ont été prévu pour l'action en cours selon l'arrière-plan ou le composant est affiché.

<modul-demo>

```html
<m-spinner skin="dark"></m-spinner>
<m-spinner skin="regular"></m-spinner>
<m-spinner skin="light"></m-spinner>
<m-spinner skin="lighter" class="grey"></m-spinner>
```

```css
.m-spinner {
    padding: 6px 0;
}
.grey {
    background: #333333;
}
```

</modul-demo>

### Taille
Le composant *action en cours* prévoit deux tailles, soit la taille petit ou la large. Cette taille varie en fonction de son contexte d'utilisation.

<modul-demo>

```html
<m-spinner size="small"></m-spinner>
<m-spinner size="large"></m-spinner>
```

</modul-demo>