Les pages d'erreur sont affichées à l'utilisateur lorsque le système n'est pas capable de répondre à une demande ou qu'il n'est pas configuré correctement.

<modul-do>
    <ul>
        <li>Lorsque l'application n'est pas en mesure d'afficher l'entête et le menu, utiliser la page d'erreur pour la page entière</li>
        <li>Lorsque l'application est en mesure d'afficher l'entête et le menu, utiliser la page d'erreur dans le corps de page</li>
        <li>Lorsque l'application est en mesure d'afficher la page entière mais qu'un erreur survient lors d'une action ou d'un appel de service, utiliser la page d'erreur dans une fenêtre modale</li>
    </ul>
</modul-do>

<modul-dont>
    <ul>
        <li>Si une erreur se produit dans le processus normal de l'application, par exemple, une validation qui échoue, il est préférable d'utiliser un <modul-go url="message" /></li>
    </ul>
</modul-dont>

Il existe plusieurs types de page d'erreur qui partagent plusieurs de leurs caractéristiques. Chaque type de page d'erreur ont par contre des cas d'utilisation spécifiques et quelques particularités

## Caractéristiques
### Titre
L'option **Titre** permet de remplacer la titre par défaut par un titre personnalisé.

<modul-demo>

```html
<m-error-access-denied title="Titre personalisé" />

```

</modul-demo>

### Description
L'option **Description** permet de remplacer la description par défaut par une ou plusieurs lignes de description personnalisées.

<modul-demo>

```html
<m-error-access-denied v-bind:hints="['Description 1', 'Description 2', 'Description 3']" />

```

</modul-demo>


### Liens
L'option **Liens** permet d'ajouter et de remplacer des liens web vers des ressources internes ou externes.

<modul-demo>

```javascript
{
    data: {
        links: [{
            label: 'Mon premier lien personnalisé',
            url:'http://www.ulaval.ca',
            external:true
        },{
            label: 'Mon deuxième lien personnalisé',
            url:'http://www.google.ca',
            external:true
        }]
    }
}
```

```html
<m-error-access-denied v-bind:links="links" />

```

</modul-demo>
