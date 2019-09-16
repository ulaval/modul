Le sélecteur de date est utilisé pour permettre à l'utilisateur de sélectionner une date.

## Caractéristiques

### Format de la date
Le format de date retenu pour la saisie et la modification est le suivant&nbsp;: **AAAA-MM-JJ**. Il doit être utilisé chaque fois qu'une date peut être inscrite ou modifiée par un utilisateur. Ce format est automatiquement appliqué lorsque l'utilisateur passe par le sélecteur de date.
<m-panel class="m-u--margin-top">
    <p>2018-12-15</p>
</m-panel>

### Période de temps limite
Il est possible de définir une période de temps limite ou l'utilisateur pourra sélectionner une date. Il sera donc impossible de sélectionner une date à l'extérieur de cette période.

<modul-demo>

```html
<m-datepicker min="2018-03-01" max="2018-04-15"></m-datepicker>
```

</modul-demo>

### Semaine
La semaine débute le dimanche.

### Date sélectionnée
La date sélectionnée est toujours affichée dans une pastille bleue.

### Date du jour
La date du jour est toujours affichée sur fond gris, sauf lorsqu'elle n'est pas sélectionnée. Elle est alors affichée sur fond bleu.

### États et messages de validation
Ce composent gère les états (en attente, désactivé, erreur, valide) et les messages de validation tout en offrant la possibilité de personaliser chacun de ces paramètres. Lorsque possible, les validations sont effectuées à la sortie du champ.

<modul-demo>

```html
<p>
    <m-datepicker :waiting="true"></m-datepicker>
</p>
<p>
    <m-datepicker :disabled="true"></m-datepicker>
</p>
<p>
    <m-datepicker :error="true" error-message="Elit incididunt minim laborum aliquip et laboris."></m-datepicker>
</p>
<p>
    <m-datepicker :valid="true" valid-message="Elit incididunt minim laborum aliquip et laboris."></m-datepicker>
</p>
```

</modul-demo>
