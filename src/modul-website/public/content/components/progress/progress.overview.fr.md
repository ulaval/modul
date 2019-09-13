L'indicateur de progression informe l'utilisateur qu'une opération est en cours de traitement, idéalement en précisant son pourcentage d'avancement. Cette information tient l'utilisateur en haleine, et évite l'incertitude et l'impatience générées par l'absence de rétroaction.

<modul-do>
    <ul>
        <li>Lorsqu'il est disponible, toujours indiquer le pourcentage d'avancement.</li>
    </ul>
</modul-do>

## Caractéristiques

### Forme
L'indicateur de progression peut prendre la forme d'une barre horizontale ou d'un cercle en fonction de l'espace disponible.

<modul-demo>

```html
<div class="m-u--display--flex" style="justify-content: space-between;">
    <div style="width: 50%; padding-top:40px;"><m-progress value="25"></m-progress></div>
    <div style="width: 25%"><m-progress circle="true" value="67"></m-progress></div>
</div>

```

```css
.m-progress {
    margin-top: 12px;
}
```

</modul-demo>

### Pourcentage d'avancement
L'indicateur de progression devrait indiquer le pourcentage d'avancement lorsque cela est possible. Si le pourcentage d'avancement n'est pas disponible, ou trop imprécis, il est possible d'afficher l'indicateur de progression avec un mouvement perpétuel, informant l'utilisateur que le traitement de l'opération est en cours.

<modul-demo>

```html
<div class="m-u--display--flex" style="justify-content: space-between;">
    <div style="width: 50%; padding-top:40px;"><m-progress value="25"></m-progress></div>
    <div style="width: 25%"><m-progress circle="true" value="67"></m-progress></div>
</div>
<div class="m-u--display--flex" style="justify-content: space-between;">
    <div style="width: 50%; padding-top:40px;"><m-progress indeterminate="true"></m-progress></div>
    <div style="width: 25%"><m-progress indeterminate="true" circle="true"></m-progress></div>
</div>

```

```css
.m-progress {
    margin-top: 12px;
}
```

</modul-demo>

### États
Trois états sont disponibles en fonction du type d'information à transmettre.

 * **Complété** : lorsque l'opération s'est effectuée avec succès.
 * **En cours** : lorsque l'opération est en cours.
 * **En erreur** : lorsqu'une erreur a empêché l'opération de se terminer correctement.

<modul-demo>

```html
<m-progress value="100" style="width: 50%" state="completed"></m-progress>
<m-progress value="33" style="width: 50%" state="in-progress"></m-progress>
<m-progress value="67" style="width: 50%" state="error"></m-progress>
<m-message skin="light" state="error">Espace insuffisant.</m-message>
```

```css
.m-progress {
    margin-top: 22px;
}
```

</modul-demo>

Lorsqu'une erreur a empêché l'opération de se terminer correctement, un message devrait toujours informer l'utilisateur de la raison de l'échec.

### Dimensions et épaisseur du trait
La barre de progression prend la pleine largeur de son conteneur et a une épaisseur de trait par défaut de 6 pixels. Le cercle a un diamètre de 50 pixels et une épaisseur de trait de 4 pixels par défaut. Toutes ces valeurs peuvent être ajustées selon le contexte d'utilisation.
