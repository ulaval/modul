Le sélecteur de temps est utilisé pour permettre à l'utilisateur de sélectionner des heures et des minutes.

## Caractéristiques

### Format du temps
Le format retenu pour l'heure est basé sur une période de 24 h. Il est affiché de la façon suivante&nbsp;: **HH:MM**.
<m-panel class="m-u--margin-top">
    <p>10:20</p>
</m-panel>

### États et messages de validation
Ce composent gère les états (en attente, désactivé, erreur, valide) et les messages de validation tout en offrant la possibilité de personaliser chacun de ces paramètres. Lorsque possible, les validations sont effectuées à la sortie du champ.


<modul-demo>

```html
<p>
    <m-timepicker :disabled="true"></m-timepicker>
</p>
<p>
    <m-timepicker :waiting="true"></m-timepicker>
</p>
<p>
    <m-timepicker :error="true" error-message="Nulla excepteur cillum occaecat nisi occaecat duis in."></m-timepicker>
</p>
<p>
    <m-timepicker :valid="true" valid-message="Nulla excepteur cillum occaecat nisi occaecat duis in."></m-timepicker>
</p>
```

</modul-demo>