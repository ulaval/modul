Un champ de saisie permet à l'utilisateur de saisir de l'information sur une seule ligne, servant généralement à compléter un formulaire.

## Caractéristiques

### Libellé
Autant que possible, utiliser un libellé court et descriptif (un mot ou deux). Si le libellé ne suffit à clarifier l'information à saisir il est possible d'utiliser une des 3 alternatives ci-dessous.

**Précision**
<p>La précision est affichée d'emblée et reste disponible tout au long de la saisie, l'utilisateur peut donc s'y référer en tout temps. Elle est efficace lorsqu'un court texte (souvent un exemple) suffit à mettre l'utilisateur en contexte.<p>

<modul-demo>

```html

<p>
    <m-textfield label="Code postal" type="text" helperMessage="Ex. : A0A 2B2"></m-textfield>
</p>
```

</modul-demo>

**Infobulle**
<p>Lorsqu'une précision n'est pas suffisante pour clarifier la signification du libellé, il est possible de lever l'ambiguïté à l'aide d'une <em><modul-go name="m-tooltip"></modul-go></em>.</p>

<modul-demo>

```html

<p>
    <m-textfield label="Identifiant" type="text"></m-textfield>
    <m-tooltip placement="right">
        <h5>Quel identifiant utiliser pour me connecter?</h5>
        <br />
        <strong>Étudiant ou membre du personnel de l’Université Laval</strong><br />
        Votre identifiant est votre IDUL. Celui-ci est composé de cinq lettres, générées à partir de votre prénom et de votre nom, suivies généralement d'un à trois chiffres.
        <br /><br />
        <strong>Utilisateur temporaire</strong><br />
        Si vous disposez d’un compte d’accès temporaire au Portail des cours, votre identifiant vous a été envoyé par courriel à la création du compte. Il débute par « UT » et est suivi de six chiffres.
        <br /><br />
        <strong>Participant au MOOC</strong><br />
        Si vous avez créé un compte pour vous inscrire à un MOOC, votre identifiant est le courriel saisi lors de la création du compte. Si vous vous êtes inscrit au MOOC avec votre IDUL, utilisez plutôt ce dernier pour vous connecter.
    </m-tooltip>
</p>
```

</modul-demo>

**Texte de remplissage**
<p>Si vos champs de saisie ne peuvent pas être accompagnés d'un libellé (comme pour l'<em><modul-go name="m-inplaceedit"></modul-go></em>), l'utilisation d'un texte remplissage lorsque le champs est vide est recommandé. Ce texte par défaut disparait dès que le premier caractère est saisi.</p>

<modul-demo>

```html

<p>
    <m-textfield type="text" placeholder="Note sans titre"></m-textfield>
</p>
<p>
    <m-textfield type="text" placeholder="Saisir la description de la note"></m-textfield>
</p>
```

</modul-demo>

### Type de champ
Le type de champ est très important, surtout lors de l'utilisation avec un appareil mobile, puisqu'il permet d'indiquer au navigateur le type de données attendues dans le champ et ainsi afficher le bon type de clavier. Cinq types sont supportés par le composant&nbsp;: **texte**, **mots de passe**, **courriel**, **url** et **téléphone**.

<modul-demo>

```html
<p>
    <m-textfield label="Texte" type="text"></m-textfield>
</p>
<p>
    <m-textfield label="Mots de passe" type="password" ></m-textfield>
</p>
<p>
    <m-textfield label="Courriel" type="email"></m-textfield>
</p>
<p>
    <m-textfield label="Url" type="url"></m-textfield>
</p>
<p>
    <m-textfield label="Téléphone" type="tel"></m-textfield>
</p>
```

</modul-demo>

Cette propriété ne permet pas d'effectuer de validation, le champ de saisie acceptera n'importe quel caractère.

### Longueur du champ
La longueur du champ est déterminée par la longueur estimée du contenu que l'on s'attend à recevoir. Le champ doit être suffisamment grand pour que la plupart des valeurs possibles soient visibles, tout en évitant de le surdimensionner.

Par exemple, si on s'attend à un code postal, le champ pourrait afficher 7 caractères. Si on s'attend à un prénom, le champ pourrait, par exemple, afficher jusqu'à 40 caractères.

### États et validations

**Désactivé**&nbsp;: Le champ de saisie ne peut être modifié.

<modul-demo>

```html
<p>
    <m-textfield :disabled="true" ></m-textfield>
</p>
```

</modul-demo>

[//]: # (**En attente**&nbsp;: Le champ de saisie est désactivé, et un indicateur informe l'utilisateur qu'un traitement est en cours.)

[//]: # (<modul-demo>)

[//]: # (```html)
[//]: # (<p>)
[//]: # (    <m-textfield :waiting="true"></m-textfield>)
[//]: # (</p>)
[//]: # (```)

[//]: # (</modul-demo>)

**En erreur**&nbsp;: Le champ de saisie contient une erreur, un message indiquant comment régler le problème est affiché en dessous du champ.

<modul-demo>

```html
<p>
    <m-textfield label="Identifiant" :error="true" error-message="L'identifiant est obligatoire."></m-textfield>
</p>
```

</modul-demo>

**Valide**&nbsp;: Le texte saisi par l'utilisateur respecte tous les critères exigés, un message de confirmation peut être affiché en dessous du champ.

<modul-demo>

```html
<p>
    <m-textfield label="Mot de passe" value="abcdefgh" type="password" :passwordIcon="false" :valid="true" valid-message="Votre mot de passe est sécuritaire."></m-textfield>
</p>
```

</modul-demo>