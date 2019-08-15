L'édition sur place permet à l'utilisateur de modifier un texte dans son contexte, sans effectuer de navigation supplémentaire. Il peut en tout temps se référer au reste de l'interface et s'assurer du rendu visuel du texte qu'il est en train d'éditer.

Il est possible de modifier plusieurs textes en même temps lorsqu'ils appartiennent à un petit regroupement logique. Par exemple, le titre et la description d'une section.

<modul-do>
    <ul>
        <li>Utiliser ce composant lorsque le nombre de champs à éditer est limité (de 1 à 3).</li>
        <li>Utiliser ce composant lorsque l'utilisateur a besoin de se référer au reste de la page pour réaliser sa tâche. Par exemple, lorsqu'il édite un texte faisant partie d'une série.</li>
    </ul>
</modul-do>

<modul-dont>
    <ul>
        <li>Lorsqu'un regroupement logique contient trop de champs, il est alors préférable de présenter tous les champs éditables d'emblée dans un formulaire classique.</li>
    </ul>
</modul-dont>

### Donner accès au mode édition

Lorsque l'on décide d'utiliser l'édition sur place dans un système de gestion de contenu, il est recommandé de suivre le comportement habituel du système. Par exemple, dans les sites de cours, le menu d'options est privilégié pour donner accès au mode édition.<br />

<modul-demo>

```javascript
{
    data: {
        internalEditMode: false,

    },
    methods: {
        onSave: () => { return Promise.resolve(); }
    },
    computed:{
        editMode: {
            get: function() {
                return this.internalEditMode;
            },
            set: function(value) {
                this.internalEditMode = value;
            }
        }
    }
}
```

```css
.modul-demo__inplace-edit-component.modul-demo__inplace-edit-component {
    padding: 10px;
}
.modul-demo__inplace-edit-read-mode {
    position: relative;
}
.modul-demo__inplace-edit-title {
    padding-right: 44px;
}
.modul-demo__inplace-edit-button.modul-demo__inplace-edit-button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
}
```

```html
<m-inplace-edit :editMode.sync="editMode" :save-fn="onSave" class="modul-demo__inplace-edit-component">
    <div slot="readMode" class="modul-demo__inplace-edit-read-mode">
        <p class="modul-demo__inplace-edit-title">La déforestation des espaces protégés</p>
        <m-menu placement="bottom-end" class="modul-demo__inplace-edit-button">
            <m-menu-item @click="editMode = true" title="Modifier le titre de la section">Modifier</m-menu-item>
            <m-menu-item title="Supprimer le titre de la section">Supprimer</m-menu-item>
        </m-menu>
    </div>
    <div slot="editMode">
      <!-- pour :focus ==> utiliser isMqMinS pour ne pas mettre le focus automatique lorsque l'affichage est en mode mobile (au lieu de true en tout temps) -->
        <m-textfield max-width="none" value="La déforestation des espaces protégés" :focus="true"></m-textfield>
    </div>
</m-inplace-edit>

```

</modul-demo>

Dans les autres cas, considérer l'importance de l'action d'éditer par rapport à la clarté de l'interface. Si l'action d'édition est prioritaire, l'utilisation d'un bouton pourrait être justifié. Au contraire, s'il y a beaucoup d'élément éditables, et que l'on souhaite préserver la clarté de l'interface, une icône cliquable sera plus discrête. Un effet visuel au survol du texte à éditer peut également faciliter la compréhension.

<modul-demo>

```javascript
{
    data: {
        internalEditMode: false,
        isFocusTitle: false,
        isFocusDesc: false,
        text: "Depuis une dizaine d’années, les surfaces déforestées en Amazonie diminuent chaque année et le déboisement en 2014 a représenté moins de 20 % de celui de 2004. Doit-on en déduire que le Brésil maîtrise désormais le phénomène de déforestation ? Répondre à cette question implique d’exposer la complexité du phénomène de déforestation."
    },
    methods: {
        onClick(element) {
            this.editMode = true;
            if (element == "title") {
                this.isFocusTitle = true;
            }
            if (element == "desc") {
                this.isFocusDesc = true;
            }
        },
        onSave() {
            this.isFocusDesc = false;
            this.isFocusTitle = false;
            return Promise.resolve();
        }
    },
    computed:{
        editMode: {
            get: function() {
                return this.internalEditMode;
            },
            set: function(value) {
                this.isFocusDesc = false;
                this.isFocusTitle = false;
                this.internalEditMode = value;
            }
        }
    }
}
```

```css
.modul-demo__inplace-edit-component.modul-demo__inplace-edit-component {
    padding: 10px;
}
.modul-demo__inplace-edit-read-mode {
    position: relative;
}
.modul-demo__inplace-edit-title {
    padding-right: 44px;
}
.modul-demo__inplace-edit-button.modul-demo__inplace-edit-button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
}
.modul-demo__inplace-edit-zone {
    margin: -10px !important;
    padding : 10px;
    cursor: text;
    transition: background-color 0.3s;
}
.modul-demo__inplace-edit-zone:hover {
    background-color: #fff8e6;
}
```

```html
<m-inplace-edit :editMode.sync="editMode" :save-fn="onSave" class="modul-demo__inplace-edit-component">
    <div slot="readMode" title="Modifier la section" class="modul-demo__inplace-edit-zone" @click="onClick('title')">
        <div class="modul-demo__inplace-edit-read-mode" @click.stop="onClick('title')">
            <m-icon-button class="modul-demo__inplace-edit-button" icon-name="m-edit"></m-icon-button>
            <h3 class="modul-demo__inplace-edit-title m-u--no-margin">La déforestation des espaces protégés</h3>
        </div>
        <div class="m-u--margin-top" @click.stop="onClick('desc')">
            <p>Depuis une dizaine d’années, les surfaces déforestées en Amazonie diminuent chaque année et le déboisement en 2014 a représenté moins de 20 % de celui de 2004. Doit-on en déduire que le Brésil maîtrise désormais le phénomène de déforestation ? Répondre à cette question implique d’exposer la complexité du phénomène de déforestation.</p>
        </div>
    </div>
    <div slot="editMode">
      <!-- pour :focus ==> ajouter isMqMinS pour ne pas mettre le focus automatique lorsque l'affichage est en mode mobile -->
        <m-textfield max-width="none" value="La déforestation des espaces protégés" tag-style="h3" :focus="isFocusTitle"></m-textfield>
        <m-textarea max-width="none" class="m-u--margin-top" :value="text" :focus="isFocusDesc"></m-textarea>
    </div>
</m-inplace-edit>

```

</modul-demo>

#### Focus
Lorsqu'un bouton permet d'accéder à l'édition, le premier champ éditable reçoit le focus. Si toute la zone est réactive comme dans l'exemple ci-dessus, le focus est donné au champ survolé au moment du clic.

Il est déconseillé de donner le focus automatiquement sur petits écrans, afin d'éviter de masquer des éléments importants du formulaire derrière le clavier.

#### Accessibilité
Les utilisateurs ayant recours à une assistance technique pour la lecture d'écran doivent être informés du type de contenu qu'ils pourront éditer.

### Petits écrans
Sur petits écrans, la notion de page est beaucoup moins omniprésente, et la navigation vers un nouvel écran est plus naturelle. Elle permet d'isoler la tâche, de réduire la charge mentale et facilite ainsi l'édition. Lorsque sur grand écran, l'édition se fait sur place, elle se fera automatiquement dans une fenêtre secondaire sur petit écran. Il est recommandé d'ajuster le titre par défaut de la fenêtre secondaire pour le nom de l'élément, ou du regroupement d'éléments à éditer.

### Enregistrement et validation
Lorsque des validations s'appliquent, elles sont traitées comme pour un formulaire classique : au sortir du champs et après avoir cliqué sur le bouton *Enregistrer*.
Quelque soit le nombre de champs utilisés (il devrait être de 3 ou moins), les messages d'erreur sont toujours placés en dessous de chaque champ, jamais dans un message global.

<modul-demo>

```javascript
{
    data: {
        internalEditMode: false,
        errorMessage: '',
        helperMessage: 'Format : prenom.nom.1@ulaval.ca',
    },
    methods: {
        onSave() {
            this.helperMessage = '';
            this.errorMessage = 'Le courriel doit respecter le format prenom.nom.1@ulaval.ca';
            return Promise.reject('une raison');
        }
    },
    computed:{
        editMode: {
            get: function() {
                return this.internalEditMode;
            },
            set: function(value) {
                this.helperMessage= 'Format : prenom.nom.1@ulaval.ca';
                this.errorMessage = '';
                this.internalEditMode = value;
            }
        }
    }
}
```

```css
.modul-demo__inplace-edit-component.modul-demo__inplace-edit-component {
    padding: 10px;
}

.modul-demo__inplace-edit-read-mode {
    position: relative;
}
.modul-demo__inplace-edit-title {
    padding-right: 44px;
}
.modul-demo__inplace-edit-button.modul-demo__inplace-edit-button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
}
```

```html
<m-inplace-edit :editMode.sync="editMode" :save-fn="onSave" class="modul-demo__inplace-edit-component">
    <div slot="readMode" class="modul-demo__inplace-edit-read-mode">
        <div class="m-u--margin-top modul-demo__inplace-edit-title" @click.stop="onClick('desc')">
            <p class="modul-demo__inplace-edit-title">info@ulaval.ca</p>
        </div>
        <m-icon-button class="modul-demo__inplace-edit-button" @click="editMode = true" icon-name="m-edit" title="Modifier le courriel"></m-icon-button>
    </div>
    <div slot="editMode">
      <!-- pour :focus ==> utiliser isMqMinS pour ne pas mettre le focus automatique lorsque l'affichage est en mode mobile (au lieu de true en tout temps) -->
        <m-textfield max-width="none" value="info@ulaval.ca" :error-message="errorMessage" :helperMessage="helperMessage" :focus="true"></m-textfield>
    </div>
</m-inplace-edit>
```

</modul-demo>

Pour éviter la perte de données, un message d'avertissement devrait-être affiché lorsque l'utilisateur décide de naviguer vers une autre page avant d'avoir enregistré (ou annulé) ses modifications.

### États
#### En erreur

<modul-demo>

```html
<m-inplace-edit :editMode="true" :error="true" class="modul-demo__inplace-edit-component">
    <div slot="readMode" class="modul-demo__inplace-edit-read-mode">
        <h3 class="modul-demo__inplace-edit-title m-u--no-margin">Je suis un sous-titre</h3>
    </div>
    <div slot="editMode">
        <m-textfield error-message="Ce champ est requis." max-width="none" placeholder="Je suis un sous-titre" tag-style="h3"></m-textfield>
    </div>
</m-inplace-edit>

```

</modul-demo>

#### En attente

<modul-demo>

```html
<m-inplace-edit :editMode="true" :waiting="true" class="modul-demo__inplace-edit-component">
    <div slot="readMode" class="modul-demo__inplace-edit-read-mode">
        <h3 class="modul-demo__inplace-edit-title m-u--no-margin">Je suis un sous-titre</h3>
    </div>
    <div slot="editMode">
        <m-textfield waiting="true" max-width="none" placeholder="Je suis un sous-titre" tag-style="h3" ></m-textfield>
    </div>
</m-inplace-edit>
```

</modul-demo>

### Cas particuliers
#### Champ vide
Lors de l'édition d'un champ vide, il est recommandé d'utiliser un texte de remplissage pour assurer une transition fluide entre le mode de consultation et le mode d’édition. Le texte par défaut du champ en mode consultation et placé comme texte de remplissage en mode édition.

<modul-demo>

```javascript
{
    data: {
        internalEditMode: false,
    },
    methods: {
        onSave() {
            return Promise.resolve();
        }
    },
    computed:{
        editMode: {
            get: function() {
                return this.internalEditMode;
            },
            set: function(value) {
                this.internalEditMode = value;
            }
        }
    }
}
```

```css
.modul-demo__inplace-edit-component.modul-demo__inplace-edit-component {
    padding: 10px;
}
.modul-demo__inplace-edit-read-mode {
    position: relative;
}
.modul-demo__inplace-edit-title {
    padding-right: 44px;
}
.modul-demo__inplace-edit-button.modul-demo__inplace-edit-button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
}
```

```html
<m-inplace-edit :editMode.sync="editMode" :save-fn="onSave" class="modul-demo__inplace-edit-component">
    <div slot="readMode" class="modul-demo__inplace-edit-read-mode">
        <h3 class="modul-demo__inplace-edit-title m-u--no-margin">Je suis un sous-titre</h3>
        <m-icon-button @click="editMode = true" icon-name="m-edit" title="Modifier le sous-titre" class="modul-demo__inplace-edit-button"></m-icon-button>
    </div>
    <div slot="editMode">
      <!-- pour :focus ==> utiliser isMqMinS pour ne pas mettre le focus automatique lorsque l'affichage est en mode mobile (au lieu de true en tout temps) -->
        <m-textfield max-width="none" placeholder="Je suis un sous-titre" tag-style="h3" :focus="true"></m-textfield>
    </div>
</m-inplace-edit>

```

</modul-demo>

#### Champ facultatif
Lors de l'édition de plusieurs éléments dont un est facultatif, le champ peut-être masqué en consultation is aucune valeur n'a été définie. Si c'est le cas, il devrait réapparaître au moment de l'édition.

<modul-demo>

```javascript
{
    data: {
        internalEditMode: false,
        text: "Depuis une dizaine d’années, les surfaces déforestées en Amazonie diminuent chaque année et le déboisement en 2014 a représenté moins de 20 % de celui de 2004. Doit-on en déduire que le Brésil maîtrise désormais le phénomène de déforestation ? Répondre à cette question implique d’exposer la complexité du phénomène de déforestation."
    },
    methods: {
        onSave() {
            return Promise.resolve();
        }
    },
    computed:{
        editMode: {
            get: function() {
                return this.internalEditMode;
            },
            set: function(value) {
                this.internalEditMode = value;
            }
        }
    }
}
```

```css
.modul-demo__inplace-edit-read-mode {
    position: relative;
}
.modul-demo__inplace-edit-title {
    padding-right: 44px;
}
.modul-demo__inplace-edit-button.modul-demo__inplace-edit-button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
}
```

```html
<m-inplace-edit :editMode.sync="editMode" :save-fn="onSave">
    <div slot="readMode" class="modul-demo__inplace-edit-read-mode">
        <m-icon-button class="modul-demo__inplace-edit-button" @click="editMode = true" icon-name="m-edit" title="Modifier le titre de la section"></m-icon-button>
        <p class="modul-demo__inplace-edit-title m-u--padding">Depuis une dizaine d’années, les surfaces déforestées en Amazonie diminuent chaque année et le déboisement en 2014 a représenté moins de 20 % de celui de 2004. Doit-on en déduire que le Brésil maîtrise désormais le phénomène de déforestation ? Répondre à cette question implique d’exposer la complexité du phénomène de déforestation.</p>
    </div>
    <div slot="editMode">
      <!-- pour :focus ==> utiliser isMqMinS pour ne pas mettre le focus automatique lorsque l'affichage est en mode mobile (au lieu de true en tout temps) -->
        <m-textfield max-width="none" placeholder="Je suis un sous-titre" tag-style="h3" :focus="true"></m-textfield>
        <m-textarea max-width="none" class="m-u--margin-top" v-model="text"></m-textarea>
    </div>
</m-inplace-edit>

```

</modul-demo>