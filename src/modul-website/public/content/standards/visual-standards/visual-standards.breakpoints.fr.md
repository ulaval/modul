# POINTS DE RUPTURE

De nos jours, une foule d'appareils permettent de naviguer sur le Web et se déclinent en différentes tailles d'écran. Depuis peu, l'utilisation combinée de téléphones intelligents et de tablettes a surpassé l'utilisation des ordinateurs. L'approche adaptative consiste donc à concevoir un site web, de façon à ce qu'il soit modulaire et puisse s'adapter à la taille de l'écran ainsi qu'aux fonctionnalités de l'appareil afin de faciliter la consultation et d'améliorer l'expérience utilisateur.

Pour ce faire, le contenu et/ou la disposition de la page sont modifiés en fonction de la taille et des fonctionnalités offertes par le navigateur. Cette approche permet entre autres d'éviter l'utilisation du défilement horizontal sur de petits appareils et de faciliter l'utilisation d'appareils tactiles.

Un site adaptatif est donc conçu à l'aide d'une grille et de points de rupture (breakpoints) définis en fonction de différentes largeurs d'écrans. Lorsque la taille de l'écran correspond à une largeur X, la disposition de la page ou le comportement d'un composant est modifié en conséquence.

## LISTE DES POINTS DE RUPTURE

<div class="m-u--header m-u--margin-top">
    <h3>Largeur minimale</h3>
</div>
<table>
    <thead>
        <tr>
            <th>Largeur</th>
            <th>Déclaré par</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>>= 480px</td>
            <td><b>isMqMinXS</b></td>
        </tr>
        <tr>
            <td>>= 769px</td>
            <td><b>isMqMinS</b></td>
        </tr>
        <tr>
            <td>>= 1024px</td>
            <td><b>isMqMinM</b></td>
        </tr>
        <tr>
            <td>>= 1200px</td>
            <td><b>isMqMinL</b></td>
        </tr>
        <tr>
            <td>>= 1600px</td>
            <td><b>isMqXL</b></td>
        </tr>
    </tbody>
</table>
<div class="m-u--header">
    <h3>Largeur maximale</h3>
</div>
<table>
    <thead>
        <tr>
            <th>Largeur</th>
            <th>Déclaré par</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>< 480px</td>
            <td><b>isMqXS</b></td>
        </tr>
        <tr>
            <td>< 769px</td>
            <td><b>isMqMaxS</b></td>
        </tr>
        <tr>
            <td>< 1024px</td>
            <td><b>isMqMaxM</b></td>
        </tr>
        <tr>
            <td>< 1200px</td>
            <td><b>isMqMaxL</b></td>
        </tr>
        <tr>
            <td>< 1600px</td>
            <td><b>isMqMaxXL </b></td>
        </tr>
    </tbody>
</table>
<div class="m-u--header">
    <h3>Largeur limite</h3>
</div>
<table>
    <thead>
        <tr>
            <th>Largeur</th>
            <th>Déclaré par</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>480px =­> ... < 769px</td>
            <td><b>isMqS</b></td>
        </tr>
        <tr>
            <td>769px => ... < 1024px</td>
            <td><b>isMqM</b></td>
        </tr>
        <tr>
            <td>1024px => ... < 1600px</td>
            <td><b>isMqL</b></td>
        </tr>
    </tbody>
</table>
