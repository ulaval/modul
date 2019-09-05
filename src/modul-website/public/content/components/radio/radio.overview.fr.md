Les boutons radio sont utilisés lorsque l’utilisateur a le choix entre deux options ou plus et que ces options s'excluent mutuellement. Ce composant, tout comme les *<modul-go url="case-a-cocher">case à cocher</modul-go>*, offrent l’avantage d’empêcher les utilisateurs d'entrer des données erronées.

<modul-do>
    <ul>
        <li>Les options devraient être énumérées dans un ordre logique&nbsp;: l’option la plus susceptibles d'être choisie à la moins susceptible, l’option la plus simple à la plus complexe ou l’option la moins risquée à la plus risquée. L'ordre alphabétique n'est pas recommandé car il dépend du langage.</li>
        <li>Les boutons radio devraient avoir une option présélectionnée. Sélectionner l'option la plus probable ou la plus pratique. Si les utilisateurs pourraient ne pas vouloir faire une sélection, vous devriez fournir un bouton radio pour ce choix, tel que celui intitulé «Aucun».</li>
        <li>Utiliser des boutons radio plutôt que des <em><modul-go url="liste-deroulante">listes déroulante</modul-go></em> si vous offrez moins de 7 options.</li>
        <li>Il est préférable de positionner la case du bouton radio à gauche de son libellé, car de cette façon il est plus facile de comprendre la fonction du composant.</li>
    </ul>
</modul-do>

<modul-dont>
    <ul>
        <li>Les boutons radio horizontaux sont parfois difficiles à repérer et à localiser, l'agencement horizontal des boutons radio peut également rendre difficile l’association du libellé avec le bouton radio.</li>
        <li>Éviter les boutons radio imbriqués avec d'autres boutons radio ou cases à cocher, vous devez garder toutes les options au même niveau pour éviter toute confusion.</li>
        <li>Ne pas utiliser les boutons radios lorsque vous avez une seule question simple et que l'utilisateur répondra soit «&nbsp;oui&nbsp;», soit «&nbsp;non&nbsp;». Utiliser plustôt le composant <em><modul-go url="case-a-cocher">case à cocher</modul-go></em>. Par exemple à la question «&nbsp;Pouvons-nous vous envoyer des mises à jour par courriel?&nbsp;», une simple case à cocher avec l’étiquette «&nbsp;Oui, veuillez utiliser le courriel pour m'envoyer des informations sur d'autres offres&nbsp;» sera plus efficace que deux boutons radio.</li>
    </ul>
</modul-dont>

## Caractéristiques

### Étiquette
L'utilisation d'une étiquette n'est pas obligatoire. Elle sert à d'écrire aux utilisateurs les options offertes par les boutons radios.

<modul-demo>

```html
<m-radio-group label="Effectuez un choix">
    <m-radio value="radio1">Choix 1</m-radio>
    <m-radio value="radio2">Choix 2</m-radio>
    <m-radio value="radio3">Choix 3</m-radio>
</m-radio-group>
<m-radio-group>
    <m-radio value="radio1">Choix 1</m-radio>
    <m-radio value="radio2">Choix 2</m-radio>
    <m-radio value="radio3">Choix 3</m-radio>
</m-radio-group>
```

```css
.m-radio-group {
    margin-top: 12px;
}
```
</modul-demo>

### Positionnement
Les boutons radios peuvent être positionné à l'horizontal ou à la vertical. Les cases peuvent également être positionnées à gauche ou à droite de leur libéllé.

<modul-demo>

```html
<m-radio-group label="Effectuez un choix" position="left">
    <m-radio value="radio1">Choix 1</m-radio>
    <m-radio value="radio2">Choix 2</m-radio>
    <m-radio value="radio3">Choix 3</m-radio>
</m-radio-group>
<m-radio-group label="Effectuez un choix" position="right">
    <m-radio value="radio1">Choix 1</m-radio>
    <m-radio value="radio2">Choix 2</m-radio>
    <m-radio value="radio3">Choix 3</m-radio>
</m-radio-group>
```

```css
.m-radio-group {
    margin-top: 12px;
}
```
</modul-demo>

### États et messages de validation
Ce composent gère les états (désactivé, erreur, valide) et les messages de validation tout en offrant la possibilité de personaliser chacun de ces paramètres.

<modul-demo>

```html
<m-radio-group label="Effectuez un choix" :disabled="true">
    <m-radio value="radio1">Choix 1</m-radio>
    <m-radio value="radio2">Choix 2</m-radio>
    <m-radio value="radio3">Choix 3</m-radio>
</m-radio-group>
<m-radio-group label="Effectuez un choix" :error="true" error-message="Mollit occaecat incididunt nisi sit.">
    <m-radio value="radio1">Choix 1</m-radio>
    <m-radio value="radio2">Choix 2</m-radio>
    <m-radio value="radio3">Choix 3</m-radio>
</m-radio-group>
<m-radio-group label="Effectuez un choix" :valid="true" valid-message="Mollit occaecat incididunt nisi sit.">
    <m-radio value="radio1">Choix 1</m-radio>
    <m-radio value="radio2">Choix 2</m-radio>
    <m-radio value="radio3">Choix 3</m-radio>
</m-radio-group>
```

```css
.m-radio-group {
    margin-top: 12px;
}
```
</modul-demo>
