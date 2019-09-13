## POURQUOI L'ACCESSIBILITÉ ?

Les normes d'accessibilité Web permettent un accès aux services et aux contenus en ligne, non seulement pour les personnes handicapées et les seniors, mais aussi pour tous les utilisateurs qui ne disposent pas du confort offert par un ordinateur de bureau situé dans une pièce tranquille. En effet, leur application concernent également les utilisateurs non handicapés placés dans des situations moins confortables, par exemple l'utilisation d'un téléphone mobile, d'une tablette, ou placés en situation particulière de bruit, de dimension d'affichage, etc. L'accessibilité du Web repose sur le respect de règles par l'ensemble des acteurs qui travaillent à la réalisation d'outils Web. L'équipe **modUL** a regroupé une liste de recommandations générales qui permettent d'offrir des outils Web accessibles.

## Recommandations

### Focus
Mettre en évidence un élément interactif dans le <abbr title="HyperText Markup Language">HTML</abbr> par un changement de style lorsque l'événement focus de ce dernier est déclanché.

### Étiquetage des éléments de formulaire
Uniformiser l’étiquetage par la «&nbsp;méthode consécutive&nbsp;»&nbsp;:

<m-panel class="m-u--margin-top">
    <p>&lt;label <b>for="nom"</b>&gt; Nom complet &lt;&nbsp;/label&gt;</p>
    <p>&lt;input type="text" name="nom" <b>id="nom"</b>&nbsp;/&gt;</p>
</m-panel>

### Alternatives textuelles
* S’il s’agit d’une balise **&lt;img&gt;** dans une balise **&lt;a&gt;** ou **&lt;button&gt;**, simplement fournir une alternative textuelle comme valeur de l’attribut **alt**. L’alternative textuelle doit décrire la cible de l’hyperlien ou l’action commandée par le bouton.
* S’il s’agit d’un svg en ligne, simplement fournir une alternative textuelle dans une balise title au début du svg.
* S’il s’agit d’un caractère remplacé par une icônes, il faudra d’abord caché ce caractère avec l’attribut ariahiden="true" puis, fournir une alternative textuelle dans un autre conteneur <abbr title="HyperText Markup Language">HTML</abbr> (**&lt;span&gt;** par exemple). Ce texte peut être visuellement caché par une classe utilitaire appropriée (Exemple : la classe *visuallyhidden* qu’on peut retrouver dans cette référence : <m-link mode="link" url="https://davidwalsh.name/html5-boilerplate" target="_blank">https://davidwalsh.name/html5-boilerplate</m-link>).

### Liens significatifs
Il est recommandé d'éviter les liens du type *«&nbsp;Lire la suite&nbsp;»* et *«&nbsp;Cliquer ici&nbsp;»*.

### Table des matières des contenus
S’assurer que les titres et sous-titres constituent une tables des matières représentative des contenus.

### Abréviations
Lorsque possible, elles devraient être contenus dans une balise **&lt;abbr&gt;**, accompagnée de l'attribut title.

### Balises <abbr title="HyperText Markup Language">HTML</abbr> 5
Lorsque possible, utiliser les balises <abbr title="HyperText Markup Language">HTML</abbr> 5 telles **&lt;aside&gt;**, **&lt;menu&gt;**, **&lt;meuitem&gt;**, **&lt;section&gt;**, etc., car elles ajoutent des éléments sémantiques à la page, ce qui signifie une meilleure accessibilité.

### Raccourcis
S'assurer de définir des raccourcis accessibles aux lecteurs vocaux vers les éléments importants en haut de page. Par exemple&nbsp;:
* Contenu de la page
* Menu
* Pied de page
* Formulaire de recherche

### Ordre de navigation (tabindex)
L'attibut tabindex, ajouté aux balises <abbr title="HyperText Markup Language">HTML</abbr>, permet d'indiquer l'ordre de passage lorsque la touche Tab est activée, et ce, quel que soit la position des éléments sur la page.

### Autres recommandations
* Indiquer, pour chaque composant, quelle info les analystes doivent fournir aux intégrateurs et/ou aux développeurs frontend.
* Indiquer aux analyste les éléments d’accessibilité qu’ils doivent fournir pour chacun des gabarits/pages de l’application.

### Lecteurs vocaux
<m-link mode="link" url="https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh" target="_blank" :icon="true">Wave</m-link>

<m-link mode="link" url="https://www.nvda-fr.org/download/" target="_blank" :icon="true">NVDA</m-link>
