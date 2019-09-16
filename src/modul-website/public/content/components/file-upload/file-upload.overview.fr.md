Le téléverseur permet à l'utilisateur de sélectionner un ou plusieurs fichiers afin de débuter le téléversement de ceux-ci. La sélection des fichiers est possible via le "glisser-déposer" ou par la fenêtre de sélection standard de l'appareil.

## Caractéristiques

### Validations

Il est possible de limiter les fichiers acceptés en spécifiant une ou plusieurs des propriétés suivantes:

* **extensions**: Limite les fichiers ayant seulement les extensions spécifiées (ex: jpg, png, mp4, etc.)
* **max-size-kb**: Limite les fichiers ne dépassant pas la taille spécifiée en kb. (ex: 1000kb)
* **max-files**: Limite le nombre de fichiers total pouvant être téléversés (ex: maximum 5 fichiers)

<modul-demo>

```html
<m-file-upload
    :extensions="['png', 'mp4']"
    :max-size-kb="10000"
    :max-files="5">
    <m-button>Téléverser</m-button>
</m-file-upload>
```

</modul-demo>

### Service $file

Le composant fonctionne de pair avec le service $file qui est disponible dans tout composant.

```javascript
Vue.component('component', {
  methods: {
      exemple() {
          this.$file //...
      }
  }
})
```

#### Utilitaires pour simplifier le téléversement

Le service $file offre les méthodes suivantes pour simplifier le téléversement:

* **upload**: Permet de démarrer le téléversement.
* **cancelUpload**: Permet d'annuler un téléversement en cours.

Ces méthodes sont normalement utilisées afin de répondre aux évènements lancés par le composant. (Par exemple, "files-ready" et "file-upload-cancel")

### Évènements

#### Type fichier

Les évènements qui ont comme paramètre un fichier ou une liste de fichiers utilise le type "MFile".

Un objet "MFile" possède notamment les propriétés suivantes:

* **name**: Nom du fichier
* **extension**: Extension du fichier (sans le .)
* **file**: Objet de type File du HTML5

#### Fichiers prêts à être téléversés

Le composant émet un évènement de type **"files-ready"** lorsque de nouveaux fichiers ont été sélectionnés.

L'évènement envoyé a comme paramètre la liste des fichiers sélectionnés.

#### Fermeture de la fenêtre de téléversement

Le composant émet un évènement de type **"done"** lorsque l'utilisateur ferme la fenêtre modale de téléversement.

L'évènement envoyé a comme paramètre la liste des fichiers dont le téléversement a été complété. (Les fichiers qui ont comme statut 'completed')

Le composant émet un évènement de type **"cancel"** lorsque l'utilisateur ferme la fenêtre modale avec le bouton "annuler". Aucun paramètre accompagne cet évènement.

#### Annulation d'un téléversement en cours

Le composant émet un évènement de type **"file-upload-cancel"** lorsque l'utilisateur clique sur l'icône permettant d'annuler un téléversement en cours.

L'évènement envoyé a comme paramètre le fichier à annuler.

#### Suppression d'un fichier téléversé

Le composant émet un évènement de type **"file-remove"** lorsque l'utilisateur clique sur l'icône permettant de supprimer un fichier téléversé.

L'évènement envoyé a comme paramètre le fichier supprimé.

### Exemple intégré

Voici un exemple d'utilisation du composant avec les utilitaires de téléversement de $file:

```html
<m-file-upload
    @files-ready="onFilesReady"
    @file-upload-cancel="onFileUploadCancel"
    @done="onFilesUploadCompleted">
    <m-button>Téléverser</m-button>
</m-file-upload>
```

```javascript
Vue.component('component', {
  methods: {
    onFilesReady(files) {
        files.forEach(f => {
            this.$file.upload(f.uid, {
                url: 'http://localhost:8989/upload'
            });
        });
    }

    onFileUploadCancel(file) {
        this.$file.cancelUpload(file.uid);
    }

    onFilesUploadCompleted(files) {
        // Do something with uploaded files !
    }
  }
})
```