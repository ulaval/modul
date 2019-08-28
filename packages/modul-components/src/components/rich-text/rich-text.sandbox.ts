import Vue, { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';
import RichTextPlugin, { MRichText } from './rich-text';
import WithRender from './rich-text.sandbox.html';


@WithRender
@Component({
    components: { MRichText }
})
export class MRichTextSandBox extends Vue {
    public model: string = '<p><strong>texte gras.</strong></p><p><em>texte italique.</em><p/><p><sub>texte indice.</sub></p><p><sup>texte exposant.</sup></p><p><br></p><p>liste à puces :</p><ul><li>élément<ul><li>sous-élément</li><li>sous-élément</li></ul></li><li>élément</li><li>élément</li></ul><p><br></p><p>liste numérotée :</p><ol><li>élément<ol><li>sous-élément</li><li>sous-élément</li></ol></li><li>élément</li><li>élément</li></ol><p><br></p><p style="margin-left: 80px;">texte indenté</p><p><a href="http://google.com">lien vers google</a></p><p><br></p><p>caractères spéciaux: ÃΥθи</p>';
    public model2: string = '<p class="rte-h2 rte_h_level1">Girafe, requin mako, raies-guitares... sont désormais protégés</p><p><img src="https://picsum.photos/550/120" data-id="7ada2e19-d0a3-45a3-a30f-0f92b5d9ca85" class="fr-fic fr-dib fr-draggable fr-fir" alt="">La Conférence mondiale sur la vie sauvage, achevée mercredi à Genève, a décidé de réglementer le commerce international de plusieurs dizaines de nouvelles espèces menacées. </p><p>Par <a href="https://www.lemonde.fr/signataires/pierre-le-hir/">Pierre Le Hir</a> Publié aujourd’hui à 16h08, mis à jour à 17h25</p><p>Temps de Lecture 7 min.</p><p><br></p><p><br></p><p><br></p><p><br></p><p>Les girafes (ici dans la réserve nationale de Samburu, au Kenya), ont vu leurs effectifs chuter de près de 40 % au cours des trois dernières décennies. IFAW/Robbie Marsland</p><p>Trois mois après l’<a href="https://www.lemonde.fr/planete/article/2019/05/06/un-million-d-especes-en-danger-d-extinction_5458785_3244.html">alerte mondiale des scientifiques sur l’effondrement de la vie sauvage</a>, qui pourrait voir un million d’espèces s’éteindre dans les prochaines décennies, la 18<sup>e</sup> Conférence des parties (182 pays et l’Union européenne) de la <a href="https://cites.org/fra">Convention sur le commerce international des espèces de faune et de flore sauvages menacées d’extinction</a> (Cites), réunie du 17 au 28 août à Genève, devait montrer sa détermination. <em>«&nbsp;Il y a urgence à changer en profondeur la façon dont nous gérons les ressources naturelles. Le statu quo n’est plus une option&nbsp;»,</em> a ainsi déclaré, en ouverture de la session, Yvonne Higuero, la secrétaire générale de la Cites.</p><p><img src="https://picsum.photos/1200/1200" style="width: 1000px;" data-id="c5ebf066-a679-47e0-a25b-536ee74d91f5" class="fr-fic fr-dib fr-draggable" alt=""></p><p>Le champ de cette convention, entrée en vigueur en&nbsp;1975, est limité au commerce international des espèces sauvages. Elle n’a pas de compétence sur les autres facteurs – perte des habitats naturels, surexploitation, pollutions, changement climatique, espèces invasives – qui concourent au recul de la biodiversité. Elle contribue à la protection des espèces en les inscrivant à son annexe I, qui interdit leur commerce international, ou son annexe II, qui l’encadre. Ces deux annexes couvrent aujourd’hui plus de 35&nbsp;000 espèces, dont environ 5&nbsp;600 animales et près de 30&nbsp;000 végétales.</p><p><br></p><p><img src="https://picsum.photos/180/180" data-id="4f51f3f1-d444-4852-b068-c213d9327fa5" class="fr-fic fr-dib fr-draggable fr-fil" alt="" style="width: 182px;"></p><p>L’édition 2019 de la conférence de la Cites, qui se tient tous les trois ans, a été extrêmement productive, puisqu’une protection va être accordée à plusieurs dizaines de nouvelles espèces sauvages. <em>« Nous sommes très satisfaits des résultats,&nbsp;</em>commente Loïs Lelanchon, du Fonds international pour la protection des animaux (IFAW)<em>. Les décisions prises à Genève par les représentants des Etats montrent qu’il existe une prise de conscience de plus en plus forte de la nécessité de réguler le commerce international qui menace la survie de nombreuses espèces. »</em></p>';

}

const RichTextSandBoxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(RichTextPlugin);
        v.component(`m-rich-text-sandbox`, MRichTextSandBox);
    }
};

export default RichTextSandBoxPlugin;
