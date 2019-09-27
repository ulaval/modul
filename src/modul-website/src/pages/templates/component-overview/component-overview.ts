
import { ComponentMeta } from '@/content/components.meta.loader';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import WithRender from './component-overview.html';

@WithRender
@Component
export class MWComponentOverview extends ModulVue {

    @Prop()
    component: ComponentMeta;

    markdown: string = null;

    fetchMarkdown() {
        if (this.component.overview) {
            let url: string = `${__webpack_public_path__}content/${this.component.overview}`;
            this.$http.execute({ method: 'get', rawUrl: url }).then((md) => {
                this.markdown = (md as any).data;
            });
        }
    }

    @Watch('component', { immediate: true })
    private routeChanged(): void {
        this.fetchMarkdown();
    }

}
