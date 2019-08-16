Une zone de texte permet à l'utilisateur de saisir des texte longs servant généralement à compléter un formulaire.

<modul-do>
    <ul>
        <li>L'utilisation d'une zone de texte est préférable à celle du<!-- <modul-go name="">texte riche</modul-go>--> texte riche lors l'utilisateur doit saisir un long texte et qu'il ne doit pas y inclure de liens ou modifier le style du texte.</li>
    </ul>
</modul-do>

<modul-dont>
    <p>Si l'information saisie dans le champ est généralement court et ne tombe pas sur deux ligne le composant  <modul-go name="m-textfield"></modul-go> devrait être utilisé au lieu de la zone de texte.</p>
</modul-dont>

## Caractéristiques

### Nombre de caractères maximal
Il est possible de limiter le nombre caractères à afficher dans la zone de texte. Si la limite caractère est atteinte ou dépassé, la saisie au clavier est encore fonctionnelle et le champ se met en erreur.

### Hauteur du champ
Le composant gère automatiquement l'ajout et le retrait de la ligne en fonction de la longeur du texte.

<modul-demo>

```javascript
{
    data: {
        text: 'Adipisicing ex irure ex aute amet occaecat veniam proident ut. Deserunt elit consequat aute nostrud. Excepteur est exercitation enim consectetur Lorem enim sint laboris anim nisi deserunt ipsum nostrud veniam. Mollit eu quis ea do cupidatat officia nostrud ipsum proident labore non deserunt. Quis tempor ut magna reprehenderit ullamco ad. Quis irure labore est reprehenderit quis.'
    }
}
```

```html
<m-textarea label="Zone de texte" :value="text"></m-textarea>
```

</modul-demo>


### États et messages de validation
Ce composent gère les états (en attente, désactivé, erreur, valide) et les messages de validation tout en offrant la possibilité de personaliser chacun de ces paramètres. Lorsque possible, les validations sont effectuées à la sortie de la zone texte.


<modul-demo>

```html
<m-textarea :disabled="true" label="Zone de texte"></m-textarea>
<m-textarea :waiting="true" label="Zone de texte"></m-textarea>
<m-textarea :error="true" label="Zone de texte" error-message="Nulla excepteur cillum occaecat nisi occaecat duis in."></m-textarea>
<m-textarea :valid="true" label="Zone de texte" valid-message="Nulla excepteur cillum occaecat nisi occaecat duis in."></m-textarea>
```

```css
.m-textarea {
    display: flex !important;
    margin-top: 12px;
}

.m-textarea:first-child {
    margin-top: 0;
}
```

</modul-demo>
