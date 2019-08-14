
import { ComponentMeta } from '@/content/components.meta.loader';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import WithRender from './component-details.html?style=./component-details.scss';

@WithRender
@Component
export class MWComponent extends ModulVue {

    @Prop()
    private component: ComponentMeta;

    markdownPreview: string = null;

    fetchMarkdown() {
        if (this.component.preview) {
            let url: string = `${__webpack_public_path__}content/${this.component.preview}`;
            this.$http.execute({ method: 'get', rawUrl: url }).then((md) => {
                this.markdownPreview = (md as any).data;
            });
        }
    }

    @Watch('component', { immediate: true })
    private routeChanged(): void {
        this.fetchMarkdown();
    }

}
