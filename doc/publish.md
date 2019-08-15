La publication des packages modul sur npm utilisent [lerna](https://github.com/lerna/lerna) et suivent la convention du [semantic versioning](https://semver.org/)

## description des branches

|nom de la branche   | type de branche  | upstream  | tag npm  | protegé |
|---|---|---|---|---|
|master   | stable   |   | latest | oui |
|develop   | next version  | master  | next | oui |
|support/**  | stable  | master   | latest | non |
|feature/hotfix/**  | feature branch | develop   | dev | non |

## publication d'un package

### publication d'une version officielle (à partir de develop)

Cette publication est utilisée lorsque l'on veut publier une nouvelle version officielle (avec tag npm `latest`) qui sera généralement un incrément de version mineur ou majeur. Cette version remplacera celle de branche `master` en tant que version supportée par celle dans la branche `develop`

1. Merge de develop dans master
`git checkout master`
`git merge --no-ff origin/master`

2. Publication et push tag des packages dans master
`lerna publish --contents packages`

3. Rebase develop with master
`git checkout develop`
`git rebase origin/master`

### publication d'une version officielle (a partir d'une branche de support)

Cette publication est utilisée lorsque l'on veut publier une nouvelle version officielle (tag npm latest) qui sera généralement un incrément de version patch. Cette version est publiée à partir d'une branche de support qui à pour origine la branche `master`

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

Cette publication est utilisé lorsque l'on veut publier une nouvelle version de type prérelease (avec le tag npm next). Cette version est publier à partir de la branche develop.

1. Publication et push tag des packages dans la branche develop
`git checkout develop`
`lerna publish pre(minor|major|patch) --preid beta --contents packages --dist-tag next`


### Publication d'une version de type canary (a partir d'une feature branche)

Cette publication est utilisée lorsque l'on veut publier une nouvelle version de type prérelease (avec le tag npm dev). Cette version est publié à partir d'une feature branche.

1. Publication et push tag des packages dans la branche develop
`git checkout feature/**`
`lerna publish --canary (minor|major|patch)  --contents packages --dist-tag dev`
