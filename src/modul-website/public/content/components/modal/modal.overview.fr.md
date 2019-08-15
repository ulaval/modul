Une *fenêtre modal* est utilisée pour afficher du contenu complémentaire tout en gardant l'utilisateur en contexte de la page en cours.

<modul-dont>
    <ul>
        <li>Une <em>fenêtre modal</em> ne doit pas être utilisée pour initier un dialogue avec l'utilisateur. Dans ce cas, il faut plutôt utiliser le composant <em><modul-go name="m-dialog"></modul-go></em>.</li>
        <li>Il n'est pas permis d'utiliser une <em>fenêtre modal</em> à l'intérieur d'une autre <em>fenêtre modal</em>.</li>
    </ul>
</modul-dont>

## Caractéristiques
### Dimensions de la fenêtre
La dimension de la fenêtre doit varier en fonction du contenu qui est affiché à l'intérieur de la fenêtre. Quatre dimensions sont disponibles: **plein écran**, **large**, **régulier** et **petit**.

<modul-demo>

```html
<p>
    <m-modal title="Titre" size="large">
        <m-button slot="trigger">Large</m-button>
        <p>Consectetur dolore commodo voluptate est laborum ex nulla. Amet nisi quis minim dolor voluptate est nisi anim elit duis enim. Sint veniam tempor occaecat irure nostrud eiusmod. Fugiat nostrud laborum pariatur dolor tempor in in nostrud reprehenderit minim culpa incididunt.</p>
        <span slot="footer">Consectetur dolore commodo voluptate est laborum ex nulla.</span>
    </m-modal>
</p>

<p>
    <m-modal title="Titre" size="regular">
        <m-button slot="trigger">Régulier</m-button>
        <p>Consectetur dolore commodo voluptate est laborum ex nulla. Amet nisi quis minim dolor voluptate est nisi anim elit duis enim. Sint veniam tempor occaecat irure nostrud eiusmod. Fugiat nostrud laborum pariatur dolor tempor in in nostrud reprehenderit minim culpa incididunt.</p>
        <span slot="footer">Consectetur dolore commodo voluptate est laborum ex nulla.</span>
    </m-modal>
</p>
<p>
    <m-modal title="Titre" size="small">
        <m-button slot="trigger">Petit</m-button>
        <p>Consectetur dolore commodo voluptate est laborum ex nulla. Amet nisi quis minim dolor voluptate est nisi anim elit duis enim. Sint veniam tempor occaecat irure nostrud eiusmod. Fugiat nostrud laborum pariatur dolor tempor in in nostrud reprehenderit minim culpa incididunt.</p>
        <span slot="footer">Consectetur dolore commodo voluptate est laborum ex nulla.</span>
    </m-modal>
</p>
```

</modul-demo>

### Petits écrans
La *fenêtre modal* s'affiche à l'aide d'une animation arrivant du bas et venant s'afficher complètement par-dessus la fenêtre principale.

### Grands écrans
La *fenêtre modal* est affichée par dessus la fenêtre principale, avec un effet de semi-transparence.

### Titre
Le titre de la *fenêtre modal* dépend de son contenu. S'il y a une action à poser dans la fenêtre, il est suggéré d'utiliser un verbe à l'infinitif pour indiquer quelle est l'action à faire. Dans le cas où il n'y a pas d'action à faire et qu'on affiche un complément d'information, il est suggéré d'utiliser le nom du sujet sur lequel porte le complément.

### Contenu
Une *fenêtre modal* peut contenir du texte, des images, des boutons, etc. N'importe quel type de contenu est permis, du moment que la distinction avec la *<modul-go name="m-modal"></modul-go>* est respecté.

### Défilement
Lorsqu'il n'est pas possible de voir l'ensemble du contenu dans l'espace visible (viewport), il doit être possible de faire défiler le contenu. L'entête de la fenêtre est figée afin de permettre un accès rapide au bouton de fermeture.

### Fermeture
Un bouton de fermeture (X en haut à droite) doit être disponible en tout temps. De plus, il est possible de fermer la fenêtre en cliquant à l'extérieur de celle-ci (grands écrans seulement).
