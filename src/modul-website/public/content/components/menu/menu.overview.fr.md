Le menu d'options permet d'afficher la liste des actions ou options disponibles pour un élément. Des boutons sont utilisés pour les actions et des boîtes à cocher sont utilisées pour les options. L'utilisation du menu d'options est recommandée dès qu'il y a plus d'une action ou option disponible pour un élément.

Le composant *m-menu-item* doit être utilisé pour chaque élément du menu d'options.

<modul-do>Il est possible d'afficher à la fois des actions et des options dans le menu. Toutefois, il est important de grouper les éléments de même type, afin de ne pas mélanger des actions avec des options. De plus, les actions doivent toujours être positionnées avant les options.</modul-do>

<modul-dont>Si une seule action ou option est disponible, il ne faut pas utiliser un menu d'options. On recommande plutôt l'utilisation d'un *<modul-go url="icone-cliquable"></modul-go>* pour une action ou d'un *<modul-go url="interrupteur"></modul-go>* pour une option.</modul-dont>

## Caractériqtiques
### Actions
L'utilisation d'une icône devant le libellé de l'action est préconisée. Si aucune icône n'est pertinente à l'action il est possible d'afficher le libellé sans icône. Lorsqu'une action est indisponible, elle est affichée, mais désactivée.

Il est important d'associer les actions à la bonne icône et au bon libélé. Les actions les plus couramment utilisées dans un menu d'options sont les suivantes&nbsp;: **Ajouter**, **Modifier**, **Supprimer** et **Archiver**.

<modul-demo>

```html
<m-menu>
    <div slot="trigger">Menu</div>
    <m-menu-item value="Ajouter" label="Ajouter"></m-menu-item>
    <m-menu-item value="Modifier" label="Modifier"></m-menu-item>
    <m-menu-item value="Supprimer" label="Supprimer"></m-menu-item>
    <m-menu-item value="Archiver" label="Archiver"></m-menu-item>
</m-menu>

```

</modul-demo>

<small class="m-u--display--block m-u--margin-top--s">À noter que les actions d'ajout, modification et suppression doivent toujours être présentées dans cet ordre.</small>

### Ouverture
Le menu d'options apparaît toujours sous forme de *<modul-go url="fenetre-contextuelle"></modul-go>*, sauf pour les petits écrans. Dans ce cas, il prends la forme d'un *m-sidebar* qui s'affiche dans le bas de la fenêtre d'affichage (viewport) et la hauteur est automatiquement ajustée en fonction du contenu du menu.
