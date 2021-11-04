Je veux les instructions en [français](#fr)

# Contributing Guide

Before submitting your contribution, please read the following guidelines.

- English instructions coming soon.

# <a name="fr"></a>Instructions à suivre pour les contributeurs

Avant de soumettre votre contribution, veuillez prendre note de ces quelques lignes directrices.

- Lire à propos de la [structure du monorepo](#psfr).
- Créer une _feature branch_ à partir de la `develop` ou `master` en fonction des changements effectué (voir plus bas). Le nom de votre branche devrait toujours débuter par _feature/_ ou _bugfix/_.
- S'assurer que le _repository_ compile correctement (`yarn run install`).
- S'assurer que les tests s'exécutent avec succès (`yarn run test`). Si une mise à jour des snapshots est nécessaire (`yarn run test:update`).
- S'assurer que le code respecte les règles de formattage (`yarn run lint`).

- Les versions des projets `modul` suivent la convention du [Semantic versioning](https://semver.org/). Lors de la création de la _pull Request_ (PR), il est important de bien suivre les instructions suivantes:

  - S'il s'agit d'une correction de bogue :

    - Soumettre la PR à partir de la branche ayant comme origine `master`
    - Ajouter le nom de la composante qui est affectée par le changements au nom de la PR (ex : `[m-button] Nom de la PR` )
    - Bien remplir tous les sections requise dans la description PR.
    - Ajouter le Label `bugfix` à la PR.
    - S'assurer que la PR contient les tests unitaires et stories associés.
    - Régler les conflits avec la branche source (s'il y a lieu)

  - S'il s'agit d'une nouvelle fonctionnalité ou d'un changements majeur:

    - Soumettre la PR à partir de la branche ayant comme origine `develop`
    - Ajouter le nom de la composante qui est affectée par le changements au nom de la PR (ex : `[m-button] Nom de la PR` )
    - Bien remplir tous les sections requise dans la description PR.
    - Ajouter le label `new feature` et/ou `breaking change` à la PR.
    - Mettre a jour la documentation dans le projet `modul-website`
    - Régler les conflits avec la branche source (s'il y a lieu)

  - S'il s'agit d'un travaux en cours (work in progress):
    - Ajouter le Label `work in progress`
    - Créer une _pull request_ de type [draft](https://github.blog/2019-02-14-introducing-draft-pull-requests/)
    - Une fois le travail completé, enlevé le label `work in progress` et convertir la PR comme décrit plus haut.

- Si possible, identifier une ou plusieurs ressources pour procéder à la revue de code. Les `codeowner` associé(s) seront ajouté automatiquement à la PR et leur approbation est nécessaire avant le merge de la PR.
- Plusieurs _commits_ peuvent être effectués au cours du processus d'approbation d'un PR.
- Un _squash merge_ est effectué lorsque le code est rapporté dans la branche `develop` ou `master`.

# <a name="psfr"></a>Structure du monorépo

**/packages/modul-[package-name]**: Contient les libraries qui composent `modul` qui sont publiés sur npm

**/src/storybook**: Environnement de développement [storybook](https://storybook.js.org/)
pour le projet `modul`

**/src/modul-website**: Site de documentation publique du projet `modul`

**/src/meta-generator**: Utilitaire permetant la génération de la documentation à partir de code typescript

**/conf**: Contient les fichiers de configuration (hook, linters, etc.).

**/doc**: Contient diverse information principalement destinées aux contributeurs internes.
