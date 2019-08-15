L'icône cliquable est un contrôle plus discrêt qu'un bouton standard, tout en offrant le même type de fonctionnalité.

<modul-do>
<ul>
<li>Utiliser l'icône cliquable là où un bouton serait trop imposant, comme l'accès au profil.</li>
<li>Utiliser l'icône cliquable lorsqu'une action est répétée dans une page, comme la modification d'une section.</li>
<li>Utiliser une icône cliquable pour afficher de l'information détaillée dans une fenêtre contextuelle, comme une liste de notifications.</li>
<li>Utiliser une icône cliquable lorsqu'il existe une image bien comprise qui illustre un concept complexe, comme un panier d'achat.</li>
</ul>
</modul-do>

## Caractéristiques
### Traitements visuels
Le composant *icône cliquable* offre plusieurs traitements visuels.

<modul-demo>

```css
.icon-list-item-no-bullet {
    list-style-type: none;
}
.icon-list-item-no-bullet>li {
    padding: 2px 0px;
}

.icon-list-padding {
    padding: 12px 6px;
}

.dark {
    background: #000;
}
```

```html
<ul class="icon-list-item-no-bullet">
    <li>
        <span class="icon-list-padding">
            <m-icon-button class="icon-list-padding" skin="light" icon-name="search"  title="Rechercher une personne">Recherche</m-icon-button>
        </span>
        <span class="m-u--font-weight--bold m-u--margin-left">Lumineux&nbsp;:</span> traitement par defaut utilisé lorsque l'arrière-plan est pâle.
    </li>
    <li>
        <span class="icon-list-padding dark">
            <m-icon-button skin="dark" icon-name="search"  title="Rechercher une personne">Recherche</m-icon-button>
        </span>
        <span class="m-u--font-weight--bold m-u--margin-left">Sombre&nbsp;:</span> utilisé lorsque l'arrière-plan est foncé.
    </li>
    <li>
        <span class="icon-list-padding">
            <m-icon-button skin="primary" icon-name="search"  title="Rechercher une personne">Recherche</m-icon-button>
        </span>
        <span class="m-u--font-weight--bold m-u--margin-left">Primaire&nbsp;:</span> utilisé pour mettre l'emphase sur la tâche ou l'action principale.
    </li>
    <li>
        <span class="icon-list-padding">
            <m-icon-button skin="secondary" icon-name="search"  title="Rechercher une personne">Recherche</m-icon-button>
        </span>
        <span class="m-u--font-weight--bold m-u--margin-left">Secondaire&nbsp;:</span> utilisé pour une des tâches ou actions secondaires.
    </li>
</ul>

```

</modul-demo>

### Taille
Tout comme une <modul-go name="m-icon"></modul-go>, la taille de l'icône cliquable n'est pas normée. Cependant, sur les petits écrans, il est important de conserver une zone cliquable minimum de 44px. L'utilisation des doigts pour interagir avec l'appareil offre peu de précision, ce minimum garantit une expérience utilisateur optimale sur ce genre d'appareil.

<!-- Mettre un exemple du plus petit icône pour préserver le 44px minimum
<modul-demo>

```html
<m-icon-button iconSize="16px" icon-name="calendar" title="Afficher le calendrier">Calendrier</m-icon-button>
<m-icon-button iconSize="24px" icon-name="calendar" title="Afficher le calendrier">Calendrier</m-icon-button>
<m-icon-button iconSize="32px" icon-name="calendar" title="Afficher le calendrier">Calendrier</m-icon-button>
```

</modul-demo>-->

### Accessibilité
Afin d'améliorer l'expérience des personnes utilisant un lecteur vocal, il est obligatoire de définir le libellé d'une icône cliquable. Comme pour un <modul-go name="m-button"></modul-go>, le libellé devrait être un verbe d'action à l'infinitif désignant l'action effectuée lorsque l'utilisateur clique sur l'icône.