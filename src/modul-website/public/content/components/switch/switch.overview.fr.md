L'interrupteur permet d'activer ou d'inactiver une option ou encore de faire un choix parmi deux états mutuellement exclusifs.

## Caractéristiques
### Libellé
Le libellé décrivant l'option est toujours placé à droite du bouton. Dans certaines situations, par exemple si on désire aligner plusieurs interrupteurs l'un sous l'autre, il peut être utile de placer le libellé à gauche.

### États et messages de validation
Ce composent gère les états (en attente, désactivé, erreur, valide) et les messages de validation tout en offrant la possibilité de personaliser chacun de ces paramètres.

<modul-demo>

```html
<m-switch :disabled="true" label="Zone de texte"></m-switch>
<m-switch :waiting="true" label="Zone de texte"></m-switch>
<m-switch :error="true" label="Zone de texte" error-message="Nulla excepteur cillum occaecat nisi occaecat duis in."></m-switch>
<m-switch :valid="true" label="Zone de texte" valid-message="Nulla excepteur cillum occaecat nisi occaecat duis in."></m-switch>
```

```css
.m-switch {
    margin-top: 12px;
}

.m-switch:first-child {
    margin-top: 0;
}
```

</modul-demo>
