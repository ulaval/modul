## ICÔNES MODUL

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum

## ICÔNES STREAMLINE 3.0

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lien vers Streamline 3.0

## AJOUT D'ICÔNES PERSONNALISÉES

<p class="m-u--typo--precision m-u--margin-top--l">Pour plus d'informations sur l'utilisation des icônes, veuillez vous référer aux composants <modul-go name="m-icon"></modul-go> et <modul-go name="m-icon-button"></modul-go>.</p>

## AJOUT D'ICÔNES PERSONNALISÉES
Bien que l'utilisation d'icônes de la librairie existante soit à privilégier, de nouvelles icônes peuvent être créées pour répondre à des besoins spécifiques.

### Taille
L'icône doit être créée à l'intérieur d'un cadre de 24x24 pixels, au format SVG. Au minimum, l'icône doit occuper entièrement une des deux dimensions.

### Choix du nom
Le nom d'une icône doit désigner l'action ou la notion qu'elle symbolise. Par exemple, l'icône de crayon est utilisée pour symboliser la modification d'un élément, son nom en français est donc <em>Modifier</em>. Une fois le nom français de l'icône choisi, il reste à déterminer son identifiant SVG.

### Identifiant SVG
Les identifiants SVG des icônes de la librairie MOD<strong>UL</strong> sont en anglais et suivent la nomenclature suivante :

<pre>m-svg__&lt;name&gt;-&lt;outline-shape&gt;-&lt;filled&gt;--&lt;direction&gt;</pre>

* **&lt;name&gt;**<br>Nom désignant l'action ou la notion que l'icône symbolise (voir la section <em>Choix du nom</em>).
* **&lt;outline-shape&gt;**<br>Forme du contour entourant l'icône, un cercle ou un carré par exemple (circle, square, etc.). Veuillez porter une attention particulière car souvent, le contour extérieur fait partie intégrante de l'icône. Dans ce cas, la forme n'est pas mentionnée dans le nom (l'horloge ou l'avertissment par exemple).
* **&lt;filled&gt;**<br>Identifie une icône « pleine », en opposition à sa version filaire.
* **&lt;direction&gt;**<br>Une même icône (de flèche) peut avoir une direction différente. Les directions possibles sont down, left, right ou up.


#### Exemples
##### Icônes sans contour, filaires
* Forme extérieure irrégulière :<br>
   <m-icon name="m-svg__edit" size="24px"></m-icon><m-icon name="m-svg__video" size="24px"></m-icon>
* Forme extérieure régulière mais qui n'est pas un contour (l'horloge par exemple) :<br>
   <m-icon name="m-svg__clock" size="24px"></m-icon><m-icon name="m-svg__warning" size="24px"></m-icon>

##### Icônes avec contour, filaires
<m-icon name="m-svg__image-square" size="24px"></m-icon>

##### Icônes « pleines » :
* Sans contour :<br>
   <m-icon name="m-svg__video-filled" size="24px"></m-icon><m-icon name="m-svg__arrow-head-filled--down" size="24px"></m-icon>
* Avec contour :<br>
   <m-icon name="m-svg__add-circle-filled" size="24px"></m-icon>

##### Même icône, directions différentes :
<m-icon name="m-svg__chevron-circle--down" size="24px"></m-icon>
<m-icon name="m-svg__chevron-circle--left" size="24px"></m-icon>
<m-icon name="m-svg__chevron-circle--right" size="24px"></m-icon>
<m-icon name="m-svg__chevron-circle--up" size="24px"></m-icon>

### Pastille
Une pastille permet d'associer un état à la notion représentée par l'icône (voir <modul-go name="m-icon"></modul-go>). Si votre nouvelle icône est succeptible d'afficher un état, il est recommandé de définir ses coordonnées exactes à même le format SVG en utilisant l'attribut <pre class="m-u--display--inline">data-badge-coordonates</pre> en prenant comme origine le coin haut gauche de l'icône.
<pre>
&lt;svg&gt;
   &lt;symbol id="m-edit" viewBox="0 0 24 24" data-badge-coordonates="20 23"&gt;&lt;/symbol&gt;
&lt;/svg&gt;
</pre>

### Pourquoi le format SVG ?
Il est recommandé d’utiliser le format SVG (Scalable Vector Graphics) plutôt qu’une police d'icônes pour les raisons suivantes&nbsp;:
* format facilement redimensionnable
* grande variété  de couleurs
* contrôle de chaque tracé (path) qui compose l’icône
* contrôle de l’épaisseur du trait
* possibilité d’animer les icônes
