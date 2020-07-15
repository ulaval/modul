
import { MWExpandablePanel } from '@/components/expendable-panel/expandable-panel';
import { MediaQueries } from '@ulaval/modul-components/dist/mixins/media-queries/media-queries';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { RouteRecord } from 'vue-router';
import WithRender from './documentation.html';

@WithRender
@Component({
    mixins: [MediaQueries]
})
export class MWDocumentationPage extends ModulVue {

    $refs: {
        expandablePanel: MWExpandablePanel;
    };

    fullPath: string;

    onSideMenuSelection() {
        this.$refs.expandablePanel.onSideMenuSelection();
    }

    urlMatch(...args) {
        return this.$route.matched.map((record: RouteRecord) => record.name).some(name => args.indexOf(name) !== -1);

    }

    @Watch('$route', { immediate: true })
    private routeChanged(): void {
        this.fullPath = this.$route.fullPath;
    }
}
