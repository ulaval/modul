Les *messages* sont utilisés pour donner de l'information pertinente aux utilisateurs.

## Caractéristiques

### Format du message

#### Régulier
Ce format est à privilégier lorsque le message concerne une page ou une section de page. La largeur du *message* varie en fonction de la largeur maximale du contenant dans lequel le message est affiché.

<modul-demo>

```html
<m-message>Ad labore ad ex do minim qui eu aliquip aute non. Tempor Lorem ipsum ad id esse minim. Pariatur cupidatat qui qui reprehenderit voluptate aute officia consectetur cillum sint do. Consequat ipsum ex est culpa sint velit nostrud nisi minim tempor nostrud tempor adipisicing do.</m-message>
```

</modul-demo>

#### Allégé
Ce format est à privilégier lorsque le message concerne un élément spécifique de l'interface. Il est possible d'ajouter un lien en fin de message, permettant de faire afficher le l'information supplémentaire dans une infobulle.

<modul-demo>

```html
<m-message skin="light">Ad labore ad ex do minim qui eu aliquip aute non. Tempor Lorem ipsum ad id esse minim. Pariatur cupidatat qui qui reprehenderit voluptate aute officia consectetur cillum sint do. Consequat ipsum ex est culpa sint velit nostrud nisi minim tempor nostrud tempor adipisicing do.</m-message>
```

</modul-demo>

### Type de message
Différents types de messages sont disponibles en fonction du type d'information à transmettre. Le type de message affiché se distingue par sa couleur et son icône.

#### Confirmation
Ce type de *message* permet d'indiquer à l'utilisateur qu'il a complété une demande, franchi une étape ou encore terminé un processus avec succès.

<modul-demo>

```html
<m-message state="confirmation">Ad labore ad ex do minim qui eu aliquip aute non. Tempor Lorem ipsum ad id esse minim. Pariatur cupidatat qui qui reprehenderit voluptate aute officia consectetur cillum sint do. Consequat ipsum ex est culpa sint velit nostrud nisi minim tempor nostrud tempor adipisicing do.</m-message>
```

</modul-demo>

#### Information
Ce type de *message* est utilisé lorsque l'on désire afficher de l'aide, une astuce ou tout simplement de l'information pertinente sur laquelle on désire mettre l'accent.

<modul-demo>

```html
<m-message state="information">Ad labore ad ex do minim qui eu aliquip aute non. Tempor Lorem ipsum ad id esse minim. Pariatur cupidatat qui qui reprehenderit voluptate aute officia consectetur cillum sint do. Consequat ipsum ex est culpa sint velit nostrud nisi minim tempor nostrud tempor adipisicing do.</m-message>
```

</modul-demo>

#### Avertissement
Ce type de *message* permet d'attirer l'attention de l'utilisateur et de l'aviser d'une situation inhabituelle.

<modul-demo>

```html
<m-message state="warning">Ad labore ad ex do minim qui eu aliquip aute non. Tempor Lorem ipsum ad id esse minim. Pariatur cupidatat qui qui reprehenderit voluptate aute officia consectetur cillum sint do. Consequat ipsum ex est culpa sint velit nostrud nisi minim tempor nostrud tempor adipisicing do.</m-message>
```

</modul-demo>

#### Erreur
Ce type de *message* est utilisé pour afficher des messages d'erreurs.

<modul-demo>

```html
<m-message state="error">Ad labore ad ex do minim qui eu aliquip aute non. Tempor Lorem ipsum ad id esse minim. Pariatur cupidatat qui qui reprehenderit voluptate aute officia consectetur cillum sint do. Consequat ipsum ex est culpa sint velit nostrud nisi minim tempor nostrud tempor adipisicing do.</m-message>
```

</modul-demo>

### Bouton de fermeture
Pour tous les types de messages au format régulier, il est possible d'ajouter une option pour le faire disparaître. De plus, il est possible d'effectuer certaines actions lors de la fermeture du message. L'utilisation de l'option de fermeture est à la discrétion de l'analyste.

<modul-demo>

```html
<m-message :close-button="true">Ad labore ad ex do minim qui eu aliquip aute non. Tempor Lorem ipsum ad id esse minim. Pariatur cupidatat qui qui reprehenderit voluptate aute officia consectetur cillum sint do. Consequat ipsum ex est culpa sint velit nostrud nisi minim tempor nostrud tempor adipisicing do.</m-message>
```

</modul-demo>
