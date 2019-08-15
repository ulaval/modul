Les cases à cocher sont utilisées lorsqu’un utilisateur peut sélectionner un seul, aucun ou plusieurs choix d’une liste d'options. Ce composant, tout comme les *<modul-go name="m-radio-group"></modul-go>*, offrent l’avantage d’empêcher les utilisateurs d'entrer des données erronées.

<modul-do>
    <ul>
        <li>La liste des cases à cocher devrait être énumérée dans un ordre logique&nbsp;: l’option la plus susceptible d'être choisie à la moins susceptible, l’option la plus simple à la plus complexe ou l’option la moins risquée à la plus risquée. L'ordre alphabétique n'est pas recommandé car il dépend du langage.</li>
        <li>Afficher les listes verticalement, avec un choix par ligne. S'il est nécessaire d'utiliser une disposition horizontale avec plusieurs options par ligne, espacer les cases et les étiquettes afin qu'il soit absolument clair quelle case est associée à quelle étiquette.</li>
        <li>Utilisez un vocabulaire affirmatif et actif pour les libellé de cases à cocher, de sorte que l'utilisateur n’a pas de doute sur le résultat de l’activation de la case à cocher. Évitez les négations telles que «&nbsp;Ne m'envoyez plus de courrier électronique&nbsp;», ce qui signifie que l'utilisateur devrait cocher la case afin que quelque chose ne se produise pas.</li>
    </ul>
</modul-do>

<modul-dont>
    <ul>
        <li>Ne pas utiliser une case à cocher pour accomplir une action, utiliser plutôt le composant <em><modul-go name="m-switch"></modul-go></em>.</li>
        <li>L’activation d’une case à cocher ne devrait pas déclencher une action. Par exemple, pour l'envoi d’un formulaire, un <em><modul-go name="m-button"></modul-go></em> devrait être utilisé en plus de la case à cocher.</li>
    </ul>
</modul-dont>

### Positionnement
Les cases à cocher peuvent être positionnées à l'horizontale ou à la verticale. Les cases peuvent également être positionnées à gauche ou à droite de leur libellé.

<modul-demo>

```html
<p>
    <m-checkbox position="left">Choix 1</m-checkbox>
</p>
<p>
    <m-checkbox position="right">Choix 1</m-checkbox>
</p>
```

</modul-demo>

### États et messages de validation
Ce composant gère les états (désactivé, erreur, valide) et les messages de validation, tout en offrant la possibilité de personaliser chacun de ces paramètres. Lorsque possible, les validations sont effectuées à la sortie de la case à cocher.

<modul-demo>

```html
<p>
    <m-checkbox :disabled="true">Choix 1</m-checkbox>
</p>
<p>
    <m-checkbox :error="true" error-message="Nulla non elit dolore magna qui aliquip nulla cillum.">Choix 1</m-checkbox>
</p>
<p>
    <m-checkbox :valid="true" valid-message="Nulla non elit dolore magna qui aliquip nulla cillum.">Choix 1</m-checkbox>
</p>
```

</modul-demo>