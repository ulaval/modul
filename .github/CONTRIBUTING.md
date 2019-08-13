Je veux les instructions en [français](#fr)

## `@ulaval\modul`
# Contributing Guide

Before submitting your contribution, please read the following guidelines.

- English instructions coming soon...

# <a name="fr"></a>Instructions à suivre pour les contributeurs

Avant de soumettre votre contribution, veuillez prendre note de ces quelques lignes directrices.

- Lire à propos de la [structure du monorepo](#psfr).
- Créer une *feature branch* à partir de la branche désirée (`develop` dans le cas d'ajout d'une nouvelle fonctionnalité ou d'un breaking change, `master` dans le cas d'une correction de bug). Le projet `modul` suit la convention [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/). Le nom de votre branche devrait toujours débuter par *feature/* ou *bugfix/*.
- À moins d'avoir à modifier la structure même du projet, le code touché par le *pull request* (PR) ne devrait concerner que les répertoires `/packages/**` et `/src/**`.
- S'assurer que le *repository* compile correctement (`yarn run bootstrap`).
- S'assurer que les tests s'exécutent avec succès (`yarn run test`). Si une mise à jour des snapshots est nécessaire (`yarn run test:update`)
- S'assurer que le code est bien formatté (`yarn run lint`).

- Les versions des projets `modul` suivent la convention du [Semantic versioning](https://semver.org/). Lors de la création de la *pull Request* (PR), il est important de bien suivre les instructions suivantes:
  - S'il s'agit d'une correction de bogue:
    - Bien remplir tous les sections requise dans la description PR.
    - Ajouter le Label `bugfix` à la PR.
    - S'assurer que la PR contient les tests unitaires et stories associés.
    - Soumettre la PR vers la branche `master`
    - Régler les conflits avec la branche source (s'il y a lieu)

  - S'il s'agit d'une nouvelle fonctionnalité:
    - Bien remplir tous les sections requise dans la description PR.
    - Ajouter le label `new feature` et/ou `breaking change` à la PR.
    - Mettre a jour la documentation dans le projet `modul-website`
    - Soumettre la PR vers la branche `develop`
    - Régler les conflits avec la branche source (s'il y a lieu)

  - S'il s'agit d'un travaux en cours (work in progress):
    - Ajouter le Label `work in progress`
    - Créer une *pull request* de type [draft](https://github.blog/2019-02-14-introducing-draft-pull-requests/)
    - Une fois le travail completé, enlevé le label `work in progress` et convertir la PR comme décrit plus haut.

- Si possible, identifier une ou plusieurs ressources pour procéder à la revue de code. Les `codeowner` associé(s) seront ajouté automatiquement à la PR et leur approbation est nécessaire avant le merge de la PR.
- Plusieurs *commits* peuvent être effectués au cours du processus d'approbation d'un PR. Un *squash merge* est effectué lorsque le code est rapporté dans la branche `develop`.

# <a name="psfr"></a>Structure du répo

**/conf**: Contient les fichiers de configuration (hook, linters, etc.).

**/packages/--package-name--**: Contient les libraries qui composent `modul`

**/src/storybook**: Environnement de développement [storybook](https://storybook.js.org/)
 pour le projet `modul`

**/src/modul-website**: Site de documentation publique du projet `modul`

**/src/meta-generator**: Utilitaire permetant la génération de la documentation à partir de code typescript