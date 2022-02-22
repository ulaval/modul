# Format

Par souci d'uniformité, certaines informations sont toujours présentées selon des formats prédéfinis.

## Date et heure

### Saisie et modification

#### Date

Le format de date retenu pour la saisie et la modification est le suivant&nbsp;: **AAAA-MM-JJ**.
<m-panel class="mu-mt">
    <p>2015-01-15</p>
</m-panel>

Il doit être utilisé chaque fois qu'une date peut être inscrite ou modifiée par un utilisateur.

#### Heure
Le format retenu pour l'heure, lors de la saisie et de la modification est basé sur une période de 24&nbsp;heures. Il est affiché de la façon suivante&nbsp;: **HH:MM**.
<m-panel class="mu-mt">
    <p>07:01</p>
    <p>2015-01-15 17:00</p>
</m-panel>

### Format de date longue
Le format long est le suivant&nbsp;: **JJ mois AAAA**. Il s'agit du format privilégié en tout temps, lors d'une situation d'affichage où l'espace n'est pas restreint.
<m-panel class="mu-mt">
    <p>15&nbsp;janvier&nbsp;2015</p>
</m-panel>

### Format de date courte
Le format court utilise le même modèle que le format long, sauf que le mois est abrégé. Ce format doit être utilisé lorsque l'espace est restreint, mais qu'il demeure pertinent d'afficher la date sous forme alphanumérique.
<m-panel class="mu-mt">
    <p>15&nbsp;janv.&nbsp;2015</p>
</m-panel>

### Format de l'heure
Le format utilisé pour afficher l'heure est le suivant&nbsp;: **HH&nbsp;h&nbsp;MM**. Une espace insécable doit précéder et suivre le «&nbsp;h&nbsp;».
<m-panel class="mu-mt">
    <p>7&nbsp;h</p>
    <p>17&nbsp;h&nbsp;05</p>
</m-panel>

### Consultation
Lorsqu'une date est affichée, mais non modifiable, on utilise un format alphanumérique. Lors de l'affichage d'une date dans un tableau, il peut être pertinent d'utiliser le format numérique si l'espace est trop restreint. Toutefois, l'utilisation d'un format alphanumérique est recommandée si possible.

### Premier du mois
Lorsque la date affichée correspond au premier du mois, on utilise toujours l'exposant <sup>**er**</sup> , peu importe qu'on utilise le format long ou le format court.
<m-panel class="mu-mt">
    <p>1<sup>er</sup> mars 2016</p>
</m-panel>

### Combinaison de date et d'heure
Lorsque l'heure est combinée au format de date long, on utilise la préposition «&nbsp;à&nbsp;» pour séparer la date et l'heure. La préposition «&nbsp;à&nbsp;» doit également être suivie d'une espace insécable afin d'éviter que l'heure se retrouve sur une ligne différente. Lorsque le format court est utilisé, la préposition «&nbsp;à&nbsp;» n'est pas affichée.
<m-panel class="mu-mt">
    <p>13&nbsp;août&nbsp;2015 à 14&nbsp;h&nbsp;30</p>
    <p>15&nbsp;janv.&nbsp;2015 8&nbsp;h&nbsp;30</p>
</m-panel>

## Plage horaire

Dans certains cas, il est pertinent de faire afficher une date sous forme de plage horaire, à l'aide de différentes notations, telles que *du ... au ... , de ... à ...*, etc. Une espace insécable doit suivre l'utilisation de chaque article ou préposition afin d'éviter d'afficher l'heure sur une ligne différente.
<m-panel class="mu-mt">
    <p>Du 12&nbsp;janvier&nbsp;2015 au 25&nbsp;avril&nbsp;2015</p>
</m-panel>

L'affichage d'une plage horaire peut contenir un seul ou une combinaison de **de dates**, **des jours** et **d'heures**.
<m-panel class="mu-mt">
    <p>Du 5&nbsp;janvier au 24&nbsp;avril</p>
    <p>Du lundi&nbsp;5 janvier au vendredi&nbsp;24&nbsp;avril</p>
    <p>Du 5&nbsp;janvier au 24&nbsp;avril, les mardis, de 13&nbsp;h à 15&nbsp;h</p>
    <p>Du 5&nbsp;janvier à 8&nbsp;h au 7&nbsp;janvier à 17&nbsp;h</p>
    <p>Tous les mardis, de 13&nbsp;h à 15&nbsp;h</p>
</m-panel>

Si une date de début est définie, mais aucune date de fin n'est précisée pour l'activité d'apprentissage&nbsp;:
<m-panel class="mu-mt">
    <p>Débute le 10&nbsp;mai&nbsp;2016</p>
</m-panel>

Si la date de fin est précisée, mais pas la date de début&nbsp;:
<m-panel class="mu-mt">
    <p>Se termine le 25&nbsp;mai&nbsp;2016</p>
</m-panel>

Si une date de début et une date de fin sont précisées, et que ces dates ne sont pas dans le même mois&nbsp;:
<m-panel class="mu-mt">
    <p>Du 2&nbsp;mars au 15&nbsp;juin&nbsp;2016</p>
</m-panel>

Si une date de début et une date de fin sont précisées, et que ces dates sont dans le même mois&nbsp;:
<m-panel class="mu-mt">
    <p>Du 15&nbsp;au 20&nbsp;juin&nbsp;2006</p>
</m-panel>

Si la date de début et la date de fin sont précisées et sont le même jour&nbsp;:
<m-panel class="mu-mt">
    <p>Le 2&nbsp;juillet&nbsp;2016</p>
</m-panel>

À noter, lors de l'affichage d'une plage horaire, il est suggéré d'afficher les jours et les mois au complet, mais il est possible d'utiliser la version abrégée si l'espace est un enjeu. De plus, l'affichage de l'année est facultatif, mais il est fortement suggéré d'en faire mention à au moins un endroit, afin d'éviter toute ambiguïté.

## Temps écoulé

Dans certaines situations, il est utile d'afficher le temps écoulé depuis la parution d'une publication ou la réception d'un courriel, d'une notification, etc. Lorsque c'est le cas, le temps écoulé doit être présenté de cette façon&nbsp;:

**Moins de 1&nbsp;minute&nbsp;:**
<m-panel class="mu-mt">
    <p>À l'instant</p>
</m-panel>

**Moins de 60&nbsp;minutes&nbsp;:** Affichage en minutes
<m-panel class="mu-mt">
    <p>Il y a 10&nbsp;minutes</p>
</m-panel>

**Moins de 24&nbsp;heure&nbsp;:** Affichage en heures
<m-panel class="mu-mt">
    <p>Il y a 2&nbsp;heures</p>
</m-panel>

**Plus de 24&nbsp;heures&nbsp;:** Affichage en jours et affichage de la date au survol de l'élément.
<m-panel class="mu-mt">
    <p>Il y a 4&nbsp;jours</p>
</m-panel>

**Plus de 30&nbsp;jours&nbsp;:** La date est affichée selon le format court.
<m-panel class="mu-mt">
    <p>23&nbsp;nov.&nbsp;2016</p>
</m-panel>

## Période de retard

Lorsque le temps de retard écoulé doit être affiché après une date limite, une date de remise de travaux, etc. Lorsque c'est le cas, le temps écoulé doit être présenté de cette façon&nbsp;:

**Moins de 60 minutes&nbsp;:** Affichage en minutes
<m-panel class="mu-mt">
    <p>10&nbsp;minutes</p>
</m-panel>

**Moins de 24&nbsp;heure&nbsp;:** Affichage en heures et minutes
<m-panel class="mu-mt">
    <p>2&nbsp;heures et 14&nbsp;minutes</p>
</m-panel>

**Plus de 24&nbsp;heures&nbsp;:** Affichage en jours et heures.
<m-panel class="mu-mt">
    <p>2&nbsp;jours et 5&nbsp;heures</p>
</m-panel>

**Plus de 7&nbsp;jours&nbsp;:** Affichage en semaines et jours.
<m-panel class="mu-mt">
    <p>3&nbsp;semaines et 3&nbsp;jours</p>
</m-panel>

La durée doit être affichée en rouge.
Il est suggéré d'afficher minutes, heures, jours et semaines au complet, mais il est possible d'utiliser l'abéviation si l'espace est un enjeu.

## Durée d'une vidéo

Pour éviter qu'une unité de durée se retrouve sur ligne différente, une espace insécable doit systématiquement séparer la valeur de son unité.

**Moins d'une minute**&nbsp;: affichage en secondes.

<m-panel class="mu-mt">
    <p>
        15&nbsp;s
    </p>
</m-panel>

**Moins de 60 minutes&nbsp;:** affichage en minutes.

<m-panel class="mu-mt">
    <p>
        8&nbsp;min
    </p>
</m-panel>

Lorsque la durée d'une vidéo est de plus d'une minute, les secondes sont simplement ignorées, sans arrondir le nombre de minutes. Dans l'exemple ci-dessus, la durée initiale de la vidéo aurait pu être 00:08:12 ou 00:08:57.

**Plus de 60 minutes&nbsp;:** affichage en heures et minutes.

<m-panel class="mu-mt">
    <p>
        1&nbsp;h 8&nbsp;min
    </p>
</m-panel>

<m-panel class="mu-mt">
    <p>
        3&nbsp;h
    </p>
</m-panel>

Lorsque la première minute de l'heure n'est pas dépassée, on affiche uniquement le nombre d'heures. Dans l'exemple ci-dessus, la durée initiale de la vidéo aurait pu être 03:00:12 ou 03:00:57.

## Somme d'argent

### Devise et symbole monétaire

Une somme d'argent est exprimée en chiffres, accompagnée du symbole monétaire de la devise qu'elle représente.
<m-panel class="mu-mt">
    <p>50 000&nbsp;$</p>
</m-panel>

Si le bassin d'utilisateurs est composé de canadiens et d'américains par exemple, le symbole du dollar n'est plus suffisant pour identifier clairement la devise. Il est recommandé d'ajouter l’abréviation ou le code de la devise accepté à l’échelle nationale ou internationale à droite du symbole. Les <a href="https://fr.wikipedia.org/wiki/ISO_4217" target="_blank">codes ISO</a> sont réservés au monde de la finance.
<m-panel class="mu-mt">
    <ul>
        <li>Canadien : 50 000&nbsp;$&nbsp;CA</li>
        <li>Américain : 50 000&nbsp;$&nbsp;US</li>
        <li>Australien : 50 000&nbsp;$&nbsp;A</li>
        <li>etc.</li>
    </ul>
</m-panel>

Si les utilisateurs sont en majorité des canadiens, un mention unique affichée à un endroit stratéque dans l'interface peut suffire à clarifier la situation.

#### Place du symbole monétaire

En français, le symbole monétaire est placé à la suite de la somme, sépraré par une espace insécable. Si le code de la devise est ajouté, le code et le symbole sont également séparés d'une espace insécable.
<m-panel class="mu-mt">
    <p>3 500&nbsp;$&nbsp;CA</p>
</m-panel>

Dans une colonne de tableau, on peut placer le symbole monétaire dans l'entête de colonne entre parenthèses.
<m-panel class="mu-mt">
    <table class="mu-max-w-xs">
        <tr><th>Description</th><th>Coût ($)</th></tr>
        <tr><td>1 CLASSIQUE VIANDE</td><td style="text-align:right">7,15</td></tr>
        <tr><td>1 OMELET. CLASSIQUE</td><td style="text-align:right">8,50</td></tr>
    </table>
</m-panel>

Dans une énumération sans entête, le symbole monétaire est répété sur chaque ligne et peut être placé avant la somme.
<m-panel class="mu-mt">
    <table class="mu-max-w-xs">
        <tr><td colspan="2" style="text-align:center">TABLE #21<br/><br/></td></tr>
        <tr><td class="mu-pr">1 CLASSIQUE VIANDE</td><td style="text-align:right">$&nbsp;7,15</td></tr>
        <tr><td class="mu-pr">1 OMELET. CLASSIQUE</td><td style="text-align:right">$&nbsp;8,50</td></tr>
    </table>
</m-panel>

### Centimes

Lorsqu'une somme d'argent comprend des centimes, on utilise la virgule comme séparateur de décimales avec deux chiffres de précision.
<m-panel class="mu-mt">
    <p>19,05&nbsp;$</p>
</m-panel>

Lors de la saisie ou modification de la partie décimale, l'utilisateur peut saisir indépendamment le point « . » ou la virgule « , » comme séparateur décimal. La virgule sera le caractère affiché en tout temps.

#### Quand ajouter « ,00 »?
Lorsque le nombre de centimes est nul, la partie décimale « ,00 » n’a généralement pas besoin d’être précisée. Par exemple, dans un texte, on écrira :
<m-panel class="mu-mt">
    <p>Le coût d'un certificat est de 20 $.</p>
</m-panel>

On affiche les deux décimales d’un montant d’argent entier lorsqu’il est comparé à d’autres montants décimaux afin de faciliter la lecture. Par exemple, dans une colonne de tableau où les montants sont alignés à droite, afficher systématiquement les deux décimales facilitera la comparaison et confirmera qu’aucun montant n’a été arrondi.
<m-panel class="mu-mt">
    <table class="mu-max-w-xs">
        <thead>
            <tr><th>Coût ($)</th></tr>
        </thead>
        <tbody>
            <tr><td style="text-align:right">89.99</td></tr>
            <tr><td style="text-align:right">9.00</td></tr>
            <tr><td style="text-align:right">19.59</td></tr>
            <tr><td style="text-align:right">20.00</td></tr>
        </tbody>
    </table>
</m-panel>

Pour les mêmes raisons, les décimales sont toujours affichées lorsque les montants sont impliqués dans un calcul comme le total d’une facture ou d’un reçu.
<m-panel class="mu-mt">
    <table class="mu-mt-l">
        <tr><td colspan="2" style="text-align:center">TABLE #21<br/><br/></td></tr>
        <tr><td>1 CLASSIQUE VIANDE</td><td style="text-align:right">$&nbsp;7,15</td></tr>
        <tr><td>1 OMELET. CLASSIQUE</td><td style="text-align:right">$&nbsp;8,00</td></tr>
        <tr><td>SOUS-TOTAL :</td><td style="text-align:right">$&nbsp;15,15</td></tr>
        <tr><td>ESCOMPTE :</td><td style="text-align:right">$&nbsp;-5,00</td></tr>
        <tr><td><strong>TOTAL :</strong></td><td style="text-align:right"><strong>$&nbsp;10,15</strong></td></tr>
    </table>
</m-panel>
