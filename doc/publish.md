modul-components utilise [lerna](https://github.com/lerna/lerna) pour la publications des packages sur npm. Et suis la convention du [semantic versioning](https://semver.org/)

## Publication d'un package

### Publication d'une version officiel (a partir de develop)

Cette publication est utilisé lorsque l'on veut publier une nouvelle version officiel (tag npm latest) qui sera généralment une version de type mineur ou majeur. Cette version remplacera la branche `master` en tant que version supporté par celle dans la branche `develop`

1. Merge de develop dans master
`git checkout master`
`git merge --no-ff origin/master`

2. Publication et push tag des packages dans master
`lerna publish --contents packages`

3. Rebase develop with master
`git checkout develop`
`git rebase origin/master`

### Publication d'une version officiel (a partir d'une branche de support)

Cette publication est utilisé lorsque l'on veut publier une nouvelle version officiel (tag npm latest) qui sera généralment une version patch. Cette version est publié à partir d'une branche de support qui provient de la branche  `master`

1. Utiliser une branche de support existante ou creer une nouvelle branche a partir de master.
`git checkout support/**`
ou
`git checkout master`
`git checkout -b support/**`

2. Faite une cherry pick des commits de develop que vous vouler ramener dans la branche de support.
`git cherry-pick [commithash]`

3. Publication et push tag des packages dans la branche de support
`lerna publish --contents packages`

### Publication d'une version beta pre-release (a partir de develop)

Cette publication est utilisé lorsque l'on veut publier une nouvelle version prérelease (tag npm next). Cette version est publier a partir de la branche develop

1. Publication et push tag des packages dans la branche develop
`git checkout develop`
`lerna publish pre(minor|major|patch) --preid beta --contents packages --dist-tag next`


### Publication d'une version de type canary (a partir d'une feature branche)

Cette publication est utilisé lorsque l'on veut publier une nouvelle version prérelease (tag npm dev). Cette version est publier a partir d'une feature branche

1. Publication et push tag des packages dans la branche develop
`git checkout feature/**`
`lerna publish --canary (minor|major|patch)  --contents packages --dist-tag dev`
