La publication des packages modul sur npm utilisent [lerna](https://github.com/lerna/lerna) et suit la convention du [semantic versioning](https://semver.org/)

## description des branches

| nom de la branche | type de branche | upstream | tag npm | protegé |
| ----------------- | --------------- | -------- | ------- | ------- |
| master            | stable          |          | @latest | oui     |
| develop           | next version    | master   | @next   | oui     |
| feature/\*\*      | feature branch  | develop  | @dev    | non     |
| bugfix/\*\*       | hotfix branch   | master   | @dev    | non     |

## publication d'un package

### publication d'une version officielle à partir de develop (minor or major release)

Cette publication est utilisée lorsque l'on veut publier une nouvelle version officielle (avec tag npm `latest`) qui sera généralement un incrément de version mineur ou majeur.

1. Verification que la branche `develop` est a jours avec la derniere version de `master`\
   `git merge-base --is-ancestor origin/master develop`\
   `echo %ERRORLEVEL%`

2. Seulement si le resultat est différent de zéro , il faudra alors mettre ajours la branche `develop` avec la derniere version de `master` avant de commencer la release.\
   `git checkout develop`\
   `git merge --no-ff origin/master`

3. Création de la `release branch` à partir `develop`\
   `git checkout -b release/[release-version] develop`

4. Publication et push tag des packages dans la `release branch`\
   `git checkout release/[release-version]`\
   `lerna publish [major | minor | patch]`

5. Fast-forward de la branche `master` avec la `release branch`\
   `git checkout master`\
   `git merge --ff-only release/[release-version]`

6. Merge de la release branch dans `develop` (idéalement un PR request)\
   `git checkout develop`\
   `git merge release/[release-version]`

7. Suppression de la release branch\
   `git branch -d release/[release-version]`

### publication d'une version officielle à partir d'une branche de master (patch release)

Cette publication est utilisée lorsque l'on veut publier une nouvelle version officielle (tag npm latest) qui sera généralement un incrément de version patch. Cette version est publiée à partir de la branche `master` et doit être mergé dans la branche `develop`

1. Création de la `hotfix branch` à partir `master`\
   `git checkout -b hotfix/[hotfix-version] master`

2. Publication et push tag des packages dans la `hotfix branch`\
   `git checkout hotfix/[hotfix-version]`\
   `lerna publish patch`

3. Fast-forward de la branche `master` avec la `hotfix branch`\
   `git checkout master`\
   `git merge --ff-only hotfix/[hotfix-version]`

4. Merge de la hotfix branch dans `develop` (idéalement un PR request)\
   `git checkout develop`\
   `git merge --no-ff hotfix/[hotfix-version]`

5. Suppression de la hotfix branch\
   `git branch -d hotfix/[hotfix-version]`

### Publication d'une version beta pre-release (a partir de develop)

Cette publication est utilisé lorsque l'on veut publier une nouvelle version de type prérelease (avec le tag npm next). Cette version est publier à partir de la branche develop.

1. Publication et push tag des packages dans la branche develop\
   `git checkout develop`\
   `lerna publish pre(minor|major|patch) --preid beta --dist-tag next`

### Publication d'une version de type canary (a partir d'une feature branche)

Cette publication est utilisée lorsque l'on veut publier une nouvelle version de type prérelease (avec le tag npm dev). Cette version est publié à partir d'une feature branche.

1. Publication et push tag des packages dans la branche develop.\
   `git checkout feature/**`\
   `lerna publish --canary (minor|major|patch) --preid dev --dist-tag dev`
