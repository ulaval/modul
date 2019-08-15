Les liens sont composés de texte et parfois d'une icone et permettent de naviguer vers un contenu spécifique.

<modul-do>
    <p>L'utilisation d'un lien est recommandée lorsque l'utilisateur doit naviguer vers une autre page, accéder à une section de la page courante ou encore pour faire afficher de l'information supplémentaire. Toutes les actions permettant de modifier le contenu du site doivent plutôt être affichées sous forme de <em><modul-go name="m-button"></modul-go></em>.</p>
</modul-do>

## Caractéristiques
### Icônes
Lorsque pertinent, une icône peut accompagner un lien. Dans ce cas, l'icône est toujours placée à la gauche du lien. Dans le cas où le lien est seul sur une ligne et qu'aucune icône spécifique n'est nécessaire, on affiche l'icône par défaut («&nbsp;>&nbsp;»).

<modul-demo>

```html
<p>
    <m-link :icon="true" mode="link" url="#">Lien</m-link>
</p>
<p>
    <m-link :icon="true" icon-name="default" mode="link" url="#">Lien</m-link>
</p>
```

</modul-demo>

### Liste de liens
Lorsqu'une liste de liens est affichée, chaque lien est précédé de l'icône par défaut («&nbsp;>&nbsp;»).

<modul-demo>

```html
<ul class="demo">
    <li>
        <m-link :icon="true" mode="link" url="#">Accueil</m-link>
    </li>
    <li>
        <m-link :icon="true" mode="link" url="#">Page 1</m-link>
    </li>
    <li>
        <m-link :icon="true" mode="link" url="#">Page 2</m-link>
    </li>
</ul>
```

</modul-demo>

### Liens internes
Tous les liens internes doivent ouvrir dans le même onglet du navigateur.

<modul-demo>

```html
<m-link mode="link" url="#">Lien</m-link>
```

</modul-demo>

### Liens externes
Les liens externes doivent ouvrir dans un nouvel onglet du navigateur. Un lien vers un fichier doit également ouvrir dans un nouvel onglet et doit être accompagné de l'icône représentant le type de fichier.

<modul-demo>

```html
<m-link mode="link" url="#" target="_blank">Lien</m-link>
```

</modul-demo>

#### Accessibilité
Les utilisateurs ayant recours à une assistance technique pour la lecture d'écran doivent être informés que les liens externes ouvrent dans une nouvelle fenêtre de leur navigateur. Le texte caché «&nbsp;Cet hyperlien s'ouvrira dans un nouvel onglet&nbsp;» accompagne alors le lien externe afin d'être «&nbsp;lu&nbsp;» à l'utilisateur.

### Lien visité
Par défaut, un lien qui a été visité change de couleur. En effet, il est souvent pertinent pour l'utilisateur de voir quels liens ont été cliqués, par exemple, dans un outil de recherche. Toutefois, dans plusieurs situations il est non pertinent d'afficher le lien comme étant visité, par exemple, le lien vers le site de cours d'un étudiant. Dans ce cas, il faut le spécifier au dossier fonctionnel.

<modul-demo>

```html
<p>
    <m-link mode="link" url="#" :unvisited="false">Lien</m-link>
</p>
<p>
    <m-link mode="link" url="#" :unvisited="true">Lien</m-link>
</p>
```

</modul-demo>

### Lien courriel
Un lien ouvre un nouveau courriel avec l'adresse du destinataire pré-écrite si un outil de courriels est installé sur l'appareil de l'utilisateur. Inscrire l'adresse courriel après le «&nbsp;mailto:&nbsp;» dans le lien.

<modul-demo>

```html
<m-link mode="link" url="mailto:adresse@domaine.ca">Courriel</m-link>
```

</modul-demo>

### Accessibilité
Dans certains cas, le texte d'un lien peut s'avérer peu explicite, par exemple « En savoir plus ». Il peut être nécessaire dans ce cas d'ajouter une information additionnelle, afin de préciser le contexte aux utilisateurs ayant recours à une assistance technique pour la lecture d'écran. Un texte caché qui sera «&nbsp;lu&nbsp;» à l'utilisateur devrait donc être ajouté au lien.

<modul-demo>

```html
<p>
    <m-link mode="link" url="#" aria-label="Fermer la fenêtre">X</m-link>
</p>
<p>
    <m-link mode="link" url="#">
        <span aria-hidden="true">X</span>
        <span class="m-u--visually-hidden">Fermer la fenêtre</span>
    </m-link>
</p>
```

</modul-demo>